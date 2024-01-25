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

interface ListOptionsProps {
  data: List
  onAddCard: () => void
}

export const ListOption = ({ data, onAddCard }: ListOptionsProps) => {
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
        <form>
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormSubmit
            className="w-full h-auto justify-start font-normal p-2 px-5 text-sm rounded-none "
            variant="ghost"
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form>
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormSubmit
            className="w-full h-auto justify-start font-normal p-2 px-5 text-sm rounded-none "
            variant="ghost"
          >
            Delete list...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
