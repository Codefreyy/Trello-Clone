"use client"
import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

export const DeleteButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button size="sm" variant="secondary" type="submit" disabled={pending}>
      Delete
    </Button>
  )
}
