import { Separator } from "@/components/ui/separator"
import { BoardList } from "./_components/BoardList"
import { Info } from "./_components/Info"

const OrganizationIdPage = async () => {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <Info />
        <Separator />
        <div className="px-2 md:px-2">
          <BoardList />
        </div>
      </div>
    </>
  )
}

export default OrganizationIdPage
