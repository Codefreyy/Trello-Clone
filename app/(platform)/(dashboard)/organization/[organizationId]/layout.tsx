import { OrgControl } from "./_components/OrgControl"
import { auth } from "@clerk/nextjs"
import { startCase } from "lodash"

// generateMetadata (correct) generateMetaData(wrong)
export function generateMetadata() {
  const { orgSlug } = auth()
  return {
    title: startCase(orgSlug || "organization"),
  }
}

export default function OrganizationIdLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  )
}
