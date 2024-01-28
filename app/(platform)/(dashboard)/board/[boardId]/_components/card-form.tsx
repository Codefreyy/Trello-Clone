interface CardFormProps {
  isEditing: boolean
  enableEditing: () => void
  disableEditing: () => void
  listId: string
}

export const CardForm = ({
  isEditing,
  enableEditing,
  disableEditing,
  listId,
}: CardFormProps) => {
  return <div>Card Form</div>
}
