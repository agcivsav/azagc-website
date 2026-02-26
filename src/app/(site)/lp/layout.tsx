import MinimalHeader from '@/components/layout/MinimalHeader'

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MinimalHeader />
      <main>{children}</main>
    </>
  )
}
