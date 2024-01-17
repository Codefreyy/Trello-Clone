import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { notFound, redirect } from "next/navigation"

const boardIdPageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { boardId: string }
}) => {
  const { orgId } = auth()
  if (!orgId) redirect("/select-org")

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
    },
  })
  if (!board) {
    notFound()
  }
  return (
    <div
      className="relative bg-center bg-no-repeat bg-cover h-full"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <main className="relative pt-28 h-full">
        {" "}
        {children}
        {JSON.stringify(board)}
      </main>
    </div>
  )
}

export default boardIdPageLayout
