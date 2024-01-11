"use client"

import { createBoard } from "@/actions/create-board"
import { MyButton } from "./Button"
import { FormInput } from "./FormInput"
import { useAction } from "@/hooks/use-action"

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
  }
  return (
    <form action={onSubmit} className="flex gap-2">
      <FormInput errors={fieldErrors} />
      <MyButton />
    </form>
  )
}
