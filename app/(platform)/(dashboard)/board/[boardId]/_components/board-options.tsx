"use client"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAction } from "@/hooks/use-action"
import { MoreHorizontal, X } from "lucide-react"
import { deleteBoard } from "../../../../../../actions/delete-board/index"
import { toast } from "sonner"

export const BoardOptions = ({ id }: { id: string }) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onSuccess: () => {
      toast.success(`Delete successfully!`)
    },
    onError: error => {
      toast.error(error)
    },
  })

  const onDelete = () => {
    execute({ id })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board actions
        </div>
        <PopoverClose asChild>
          <Button
            className="w-auto h-auto absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onDelete}
          variant="ghost"
          disabled={isLoading}
          className="rounded-none w-full h-auto p-2 px-5 font-normal text-sm justify-start"
        >
          Delete this board...
        </Button>
      </PopoverContent>
    </Popover>
  )
}
