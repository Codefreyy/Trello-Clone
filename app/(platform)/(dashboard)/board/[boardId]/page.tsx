import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"

interface BoardIdPageParam {
  params: {
    boardId: string
  }
}

const BoardIdPage = async ({ params }: BoardIdPageParam) => {
  const { orgId } = auth()
  if (!orgId) {
    redirect("/select-org")
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
  })
  return <div></div>
}

export default BoardIdPage
