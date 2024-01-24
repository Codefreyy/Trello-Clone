"use client"

import { updateList } from "@/actions/update-list"
import { FormInput } from "@/components/form/form-input"
import { useAction } from "@/hooks/use-action"
import { List } from "@prisma/client"
import { ElementRef, useRef, useState } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { toast } from "sonner"

interface ListHeaderProps {
  data: List
}

export const ListHeader = ({ data }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title)
  const [isEditing, setIsEditing] = useState(false)

  const inputRef = useRef<ElementRef<"input">>(null)
  const formRef = useRef<ElementRef<"form">>(null)

  function enableEditing() {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  function disabledEditing() {
    setIsEditing(false)
  }

  const { execute } = useAction(updateList, {
    onSuccess: data => {
      toast.success(`Rename to "${data.title}"!`)
      setTitle(data.title)
      disabledEditing()
    },
    onError: error => {
      toast.error(error)
    },
  })

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key == "Escape") {
      formRef.current?.requestSubmit()
    }
  }

  useEventListener("keydown", onKeyDown)

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string

    if (title === data.title) {
      return disabledEditing()
    }

    execute({
      title,
      id: data.id,
      boardId: data.boardId,
    })
  }

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form action={onSubmit} ref={formRef}>
          <input hidden id="id" name="id" value={data.id} onChange={() => {}} />
          <input
            hidden
            id="boardId"
            name="boardId"
            value={data.boardId}
            onChange={() => {}}
          />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            name="title"
            placeholder="Enter list title..."
            defaultValue={title}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
        </form>
      ) : (
        <div
          className="w-full text-sm px-2.5 py-1 h-7 font-medium"
          onClick={enableEditing}
        >
          {title}
        </div>
      )}
    </div>
  )
}
