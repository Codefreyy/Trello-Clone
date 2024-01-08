import { auth, OrganizationSwitcher } from "@clerk/nextjs"

const OrganizationIdPage = () => {
  const { userId, orgId } = auth()
  return (
    <>
      <h1>OrganizationID: {orgId}</h1>
    </>
  )
}

export default OrganizationIdPage
