"use client"

import { createBoard } from "@/actions/create-board"
import { useAction } from "@/hooks/use-action"
import { FormInput } from "@/components/form/form-input"
import { FormButton } from "@/components/form/form-button"

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "SUCCESS")
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string
    execute({ title })
    console.log({ title })
  }
  return (
    <form action={onSubmit} className="flex gap-2 items-end">
      <FormInput errors={fieldErrors} id="title" name="title" label="Title" />
      <FormButton variant="default">Submit</FormButton>
    </form>
  )
}
