import { HelpCircle, User2 } from "lucide-react"
import { Hint } from "./Hint"
import { FormPopover } from "@/components/form/form-popover"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import Link from "next/link"
import { auth } from "@clerk/nextjs"

export const BoardList = async () => {
  const { orgId } = auth()
  if (!orgId) {
    return redirect("/select-org")
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createAt: "desc",
    },
  })

  console.log({ boards })

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center text-lg font-semibold">
        {" "}
        <User2 className="w-6 h-6 mr-2" />
        Your boards
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            href={`/board/${board.id}`}
            key={board.id}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm w-full h-full p-2 overflow-hidden"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition ">
              <p className="relative font-semibold text-white pl-2 pt-2">
                {board.title}
              </p>
            </div>
          </Link>
        ))}
        <FormPopover side="right" align="center" sideOffset={10}>
          <div
            role="button"
            className="px-2 aspect-video relative w-full h-wull bg-muted rounded-sm flex flex-col items-center justify-center gap-y-1
            hover:opacity-75 transition
          "
          >
            <p className="text-sm whitespace-nowrap ">Create new board</p>
            <div className="flex gap-1">
              <p className="text-xs">3 remaining</p>
            </div>
            <Hint
              description="Free workspaces can have up to 5 open boards. For unlimited boards, upgrade this workspace."
              sideOffset={1}
            >
              <HelpCircle className=" absolute right-2 bottom-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}
