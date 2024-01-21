"use client"

import { Plus, X } from "lucide-react"
import { ListWrapper } from "./list-wrapper"
import { ElementRef, useState } from "react"
import { useRef } from "react"
import { FormInput } from "@/components/form/form-input"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { useParams, useRouter } from "next/navigation"
import { FormSubmit } from "@/components/form/form-submit"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action"
import { toast } from "sonner"
import { createList } from "@/actions/create-list"

export const ListForm = () => {
  const params = useParams()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)

  const formRef = useRef<ElementRef<"form">>(null)
  const inputRef = useRef<ElementRef<"input">>(null)

  function enableEditing() {
    setIsEditing(true)
    setTimeout(() => {
      inputRef?.current?.focus()
    })
  }

  function disabledEditing() {
    setIsEditing(false)
  }

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess(data) {
      toast.success(`List "${data.title}" created`)
      disabledEditing()
      router.refresh()
    },
    onError(error) {
      toast.error(error)
    },
  })

  function onKeydown(e: KeyboardEvent) {
    if (e.key == "Escape") {
      disabledEditing()
    }
  }

  useEventListener("keydown", onKeydown)
  useOnClickOutside(formRef, disabledEditing)

  function onSubmit(formData: FormData) {
    const title = formData.get("title") as string
    const boardId = formData.get("boardId") as string

    execute({
      title,
      boardId,
    })
  }

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          className="w-full rounded-md bg-white/80 p-3 space-y-4 shadow-md"
          ref={formRef}
        >
          <FormInput
            name="title"
            ref={inputRef}
            id="title"
            errors={fieldErrors}
            placeholder="Enter list title..."
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
          />
          <input hidden value={params.boardId} name="boardId" id="boardId" />

          <div className="flex items-center gap-x-1">
            <FormSubmit>Add List</FormSubmit>
            <Button onClick={disabledEditing} size="sm" variant="ghost">
              <X className="h-5 w-5"></X>
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  )
}
