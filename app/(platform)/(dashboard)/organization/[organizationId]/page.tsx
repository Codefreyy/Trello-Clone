import { db } from "@/lib/db"
import { DeleteBoard } from "./_components/DeleteBoard"
import { Form } from "./_components/Form"

const OrganizationIdPage = async () => {
  const boards = await db.board.findMany()

  return (
    <>
      <div className="flex flex-col space-y-4">
        {" "}
        <Form />
        <div className="space-y-2">
          {boards.map((board) => (
            <DeleteBoard title={board.title} id={board.id} key={board.id} />
          ))}
        </div>
      </div>
    </>
  )
}

export default OrganizationIdPage
