import type { Tool, ToolMenuProps } from 'sanity'

/**
 * Lower number = further left in the Studio tool strip.
 * `media` = sanity-plugin-media (dataset asset browser / uploads).
 * `media-library` = optional Sanity Media Library (enterprise) tool name if enabled.
 */
const NAV_TOOL_WEIGHT: Record<string, number> = {
  structure: 10,
  vision: 20,
  media: 25,
  'media-library': 25,
  dashboard: 35,
  releases: 40,
  presentation: 45,
}

function sortToolsByNavWeight(tools: Tool[]): Tool[] {
  return tools
    .map((tool, originalIndex) => ({ originalIndex, tool }))
    .sort((a, b) => {
      const wa = NAV_TOOL_WEIGHT[a.tool.name] ?? 1000
      const wb = NAV_TOOL_WEIGHT[b.tool.name] ?? 1000
      if (wa !== wb) {
        return wa - wb
      }
      return a.originalIndex - b.originalIndex
    })
    .map(({ tool }) => tool)
}

export function OrderedToolMenu(props: ToolMenuProps) {
  return props.renderDefault({
    ...props,
    tools: sortToolsByNavWeight(props.tools),
  })
}
