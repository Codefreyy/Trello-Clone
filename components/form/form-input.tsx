import { forwardRef } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useFormStatus } from "react-dom"
import { cn } from "@/lib/utils"
import { FormErrors } from "./form-errors"

interface FormInputProps {
  onBlur?: () => void
  defaultValue?: string
  required?: boolean
  name?: string
  id?: string
  placeholder?: string
  type?: string
  className?: string
  label?: string
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      onBlur,
      defaultValue,
      required,
      name,
      id,
      placeholder,
      type,
      label,
      disabled,
      errors,
      className,
    }: FormInputProps,
    ref
  ) => {
    const { pending } = useFormStatus()
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Input
            ref={ref}
            onBlur={onBlur}
            defaultValue={defaultValue}
            required={required}
            name={name}
            id={id}
            type={type}
            disabled={pending || disabled}
            placeholder={placeholder}
            className={cn("text-sm px-2 py-1 h-7", className)}
            aira-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id as string} errors={errors!} />
      </div>
    )
  }
)

FormInput.displayName = "FormInput"
