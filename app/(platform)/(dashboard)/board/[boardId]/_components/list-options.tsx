"use client"

import { FormSubmit } from "@/components/form/form-submit"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { List } from "@prisma/client"
import { MoreHorizontal, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useAction } from "@/hooks/use-action"
import { deleteList } from "../../../../../../actions/delete-list/index"
import { toast } from "sonner"
import { useRef } from "react"
import { ElementRef } from "react"
import { copyList } from "@/actions/copy-list"

interface ListOptionsProps {
  data: List
  onAddCard: () => void
}

export const ListOption = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null)
  const { execute, isLoading } = useAction(deleteList, {
    onSuccess(data) {
      toast.success(`List ${data.title} deleted!`)
      closeRef?.current?.click()
    },
    onError(error) {
      toast.error(error)
    },
  })

  const { execute: copyListExecute, isLoading: copyListLoading } = useAction(
    copyList,
    {
      onSuccess: data => {
        toast.success(`List ${data.title} copied!`)
        closeRef?.current?.click()
      },
      onError: error => {
        toast.error(error)
      },
    }
  )

  function onDelete(formData: FormData) {
    const id = formData.get("id") as string
    const boardId = formData.get("boardId") as string

    execute({ id, boardId })
  }

  function onCopy(formData: FormData) {
    const id = formData.get("id") as string
    const boardId = formData.get("boardId") as string

    copyListExecute({ id, boardId })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto" variant="ghost">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          {" "}
          More options
        </div>
        <PopoverClose asChild>
          <Button
            ref={closeRef}
            className="absolute top-2 right-2 h-auto w-auto text-neutral-600"
            variant="ghost"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="w-full h-auto justify-start font-normal p-2 px-5 text-sm rounded-none "
          variant="ghost"
        >
          Add card...
        </Button>
        <form action={onCopy}>
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormSubmit
            className="w-full h-auto justify-start font-normal p-2 px-5 text-sm rounded-none "
            variant="ghost"
            disabled={copyListLoading}
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormSubmit
            className="w-full h-auto justify-start font-normal p-2 px-5 text-sm rounded-none "
            variant="ghost"
            disabled={isLoading}
          >
            Delete list...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
