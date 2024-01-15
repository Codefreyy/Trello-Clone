import { Separator } from "@/components/ui/separator"
import { Suspense } from "react"
import { BoardList } from "./_components/BoardList"
import { Info } from "./_components/Info"

const OrganizationIdPage = async () => {
  return (
    <>
      <div className="w-full mb-20 space-y-4">
        <Info />
        <Separator />
        <div className="px-2 md:px-2">
          <Suspense fallback={<BoardList.Skeleton />}>
            <BoardList />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default OrganizationIdPage
