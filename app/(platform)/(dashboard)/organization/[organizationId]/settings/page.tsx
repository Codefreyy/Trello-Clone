import { OrganizationProfile } from "@clerk/nextjs"

const OrganizationSettings = () => {
  return (
    <div className="w-full">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: "none",
              width: "100%",
            },
            card: {
              border: "1px",
              boxShadow: "none",
              width: "100%",
            },
          },
        }}
      />
    </div>
  )
}

export default OrganizationSettings
