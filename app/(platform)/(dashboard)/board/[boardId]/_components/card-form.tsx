import { Button } from "@/components/ui/button"
import { forwardRef } from "react"
import { Plus, X } from "lucide-react"
import { FormTextArea } from "@/components/form/form-textarea"
import { FormButton } from "@/components/form/form-button"

interface CardFormProps {
  isEditing: boolean
  enableEditing: () => void
  disableEditing: () => void
  listId: string
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ isEditing, enableEditing, disableEditing, listId }, ref) => {
    if (isEditing) {
      return (
        <form className="m-1 py-0.5 px-1 space-y-4">
          <FormTextArea
            ref={ref}
            id="title"
            onKeyDown={() => {}}
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
