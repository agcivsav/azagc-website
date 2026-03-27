import { UploadIcon } from '@sanity/icons'
import { randomKey } from '@sanity/util/content'
import { Button, Card, Flex, Spinner, Stack, Text, useToast } from '@sanity/ui'
import { useCallback, useRef, useState } from 'react'
import type { ArrayOfObjectsInputProps } from 'sanity'
import { PatchEvent, set, useClient } from 'sanity'

type SlideValue = {
  _key: string
  _type: 'slide'
  image?: {
    _type: 'image'
    asset?: { _type: 'reference'; _ref: string }
  }
  alt?: string
  caption?: string
}

function fileNameToAlt(file: File): string {
  const base = file.name.replace(/\.[^.]+$/, '')
  const cleaned = base.replace(/[-_]+/g, ' ').trim()
  return cleaned || 'Gallery image'
}

export function CarouselSlidesArrayInput(props: ArrayOfObjectsInputProps) {
  const { renderDefault, value, onChange, readOnly } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const toast = useToast()
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const appendSlidesFromFiles = useCallback(
    async (files: FileList | File[] | null) => {
      if (!files || readOnly) return
      const list = Array.from(files).filter((f) => f.type.startsWith('image/'))
      if (list.length === 0) {
        toast.push({
          status: 'warning',
          title: 'No image files',
          description: 'Drop or choose one or more image files (PNG, JPG, WebP, etc.).',
        })
        return
      }

      setUploading(true)
      try {
        const current = (value ?? []) as SlideValue[]
        const newSlides: SlideValue[] = []

        for (const file of list) {
          const asset = await client.assets.upload('image', file)
          newSlides.push({
            _type: 'slide',
            _key: randomKey(12),
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: asset._id,
              },
            },
            alt: fileNameToAlt(file),
          })
        }

        onChange(PatchEvent.from(set([...current, ...newSlides])))
        toast.push({
          status: 'success',
          title: `Added ${newSlides.length} slide${newSlides.length === 1 ? '' : 's'}`,
        })
      } catch (err) {
        console.error(err)
        toast.push({
          status: 'error',
          title: 'Upload failed',
          description: err instanceof Error ? err.message : 'Could not upload images.',
        })
      } finally {
        setUploading(false)
      }
    },
    [client, onChange, readOnly, toast, value],
  )

  return (
    <Stack space={3}>
      <Card
        padding={4}
        radius={2}
        border
        tone="transparent"
        style={{
          pointerEvents: readOnly ? 'none' : 'auto',
          opacity: readOnly ? 0.55 : 1,
        }}
        onDragOver={(e) => {
          e.preventDefault()
          e.dataTransfer.dropEffect = 'copy'
        }}
        onDrop={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void appendSlidesFromFiles(e.dataTransfer.files)
        }}
      >
        <Flex align="center" gap={3} wrap="wrap">
          <UploadIcon />
          <Stack flex={1} space={2}>
            <Text size={1} weight="medium">
              Drop multiple images here (or choose files)
            </Text>
           
          </Stack>
          <Button
            disabled={readOnly || uploading}
            mode="ghost"
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            Choose images…
          </Button>
        </Flex>
        {uploading ? (
          <Flex align="center" gap={2} marginTop={3}>
            <Spinner />
            <Text muted size={1}>
              Uploading…
            </Text>
          </Flex>
        ) : null}
        <input
          accept="image/*"
          hidden
          multiple
          onChange={(e) => {
            void appendSlidesFromFiles(e.target.files)
            e.target.value = ''
          }}
          ref={fileInputRef}
          type="file"
        />
      </Card>
      {renderDefault(props)}
    </Stack>
  )
}
