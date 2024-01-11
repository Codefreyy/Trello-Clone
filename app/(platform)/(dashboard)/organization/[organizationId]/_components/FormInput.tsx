"use client"

import { Input } from "@/components/ui/input"
import { useFormStatus } from "react-dom"

export function FormInput({
  errors,
}: {
  errors?: {
    title?: string[]
  }
}) {
  const { pending } = useFormStatus()
  return (
    <div className="flex flex-col space-y-2">
      <Input
        type="text"
        id="title"
        name="title"
        required
        disabled={pending}
        placeholder="Enter a board title"
      />
      {errors?.title ? (
        <div>
          {errors.title.map((m) => (
            <p key={m} className="text-rose-600">
              {m}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  )
}
