import { Sidebar } from "../_components/Sidebar"

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="pt-20 md:pt-24 px-4 max-w-6xl mx-auto 2xl:max-w-screen-xl">
      <div className="flex gap-x-7">
        <div className="shrink-0 hidden md:block w-64">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  )
}
