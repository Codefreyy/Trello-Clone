import { Button } from "@/components/ui/button"
import { forwardRef, KeyboardEventHandler } from "react"
import { Plus, X } from "lucide-react"
import { FormTextArea } from "@/components/form/form-textarea"
import { FormButton } from "@/components/form/form-button"
import { useAction } from "@/hooks/use-action"
import { createCard } from "@/actions/create-card"
import { toast } from "sonner"
import { useParams } from "next/navigation"
import { useRef, ElementRef } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

interface CardFormProps {
  isEditing: boolean
  enableEditing: () => void
  disableEditing: () => void
  listId: string
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ isEditing, enableEditing, disableEditing, listId }, ref) => {
    const params = useParams()
    const formRef = useRef<ElementRef<"form">>(null)
    const { execute, isLoading } = useAction(createCard, {
      onSuccess: data => {
        toast.success(`${data.title} created!`)
        formRef.current?.reset() // reset the form values
      },
      onError: error => {
        toast.error(error)
      },
    })

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing()
      }
    }

    const onTextareaKeydown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        formRef.current?.requestSubmit()
      }
    }

    useOnClickOutside(formRef, disableEditing)
    useEventListener("keydown", onKeyDown)

    function onSubmit(formData: FormData) {
      const title = formData.get("title") as string
      const listId = formData.get("listId") as string
      const boardId = params.boardId as string

      execute({ title, listId, boardId })
    }

    if (isEditing) {
      return (
        <form
          className="m-1 py-0.5 px-1 space-y-4"
          action={onSubmit}
          ref={formRef}
        >
          <FormTextArea
            ref={ref}
            id="title"
            onKeyDown={onTextareaKeydown}
            placeholder="Enter a title for this card..."
          />
          <input hidden id="listId" name="listId" value={listId} />
          <div className="flex gap-x-1 items-center">
            <FormButton variant="primary">Add Card</FormButton>
            <X className="w-4 h-4 cursor-pointer" onClick={disableEditing} />
          </div>
        </form>
      )
    }
    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="px-2 py-1.5 w-full h-auto justify-start text-muted-foreground text-sm"
          variant="ghost"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add a card
        </Button>
      </div>
    )
  }
)

CardForm.displayName = "CardForm"
