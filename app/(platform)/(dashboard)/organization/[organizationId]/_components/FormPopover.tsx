"use client"

import { createBoard } from "@/actions/create-board"
import { FormButton } from "@/components/form/form-button"
import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover"
import { useAction } from "@/hooks/use-action"
import { X } from "lucide-react"
import { toast } from "sonner"

interface FormPopoverProps {
  children: React.ReactNode
  sideOffset?: number
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

export const FormPopover = ({
  children,
  sideOffset,
  side,
  align,
}: FormPopoverProps) => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log({ data })
      toast.success("Board Created!")
    },
    onError: (err) => {
      console.log({ err })
      toast.error("Board created error!")
    },
  })

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string
    execute({ title })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent sideOffset={sideOffset} side={side} align={align}>
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormInput
              label="Title"
              id="title"
              type="text"
              name="title"
              errors={fieldErrors}
            />
          </div>
          <FormButton className="w-full">Create</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  )
}
