import { Board } from "@prisma/client"
import { BoardTitleForm } from "./board-title-form"

const BoardNavbar = ({ data }: { data: Board }) => {
  return (
    <div className="w-full h-14 z-[40] gap-x-4 text-white fixed top-14 flex items-center px-6 bg-black/50 ">
      <BoardTitleForm data={data} />
    </div>
  )
}

export default BoardNavbar
