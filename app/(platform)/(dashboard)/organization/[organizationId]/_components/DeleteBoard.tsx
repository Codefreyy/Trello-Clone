import { Button } from "@/components/ui/button"
import { deleteBoard } from "../deleteBoard"
import { DeleteButton } from "./DeleteButton"

interface BoardProps {
  title: string
  id: string
}

export function DeleteBoard({ title, id }: BoardProps) {
  const deleteTheBoard = deleteBoard.bind(null, id)

  return (
    <form className="flex gap-3" action={deleteTheBoard}>
      <div>{title}</div>
      <DeleteButton />
    </form>
  )
}
