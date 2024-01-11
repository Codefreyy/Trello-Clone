import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"
import { cn } from "@/lib/utils"

interface FormButtonProps {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  variant?:
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link"
    | "primary"
}

export const FormButton = ({
  children,
  disabled,
  className,
  variant,
}: FormButtonProps) => {
  const { pending } = useFormStatus()
  return (
    <Button
      disabled={pending || disabled}
      className={cn("", className)}
      variant={variant}
      size="sm"
      type="submit"
    >
      {children}
    </Button>
  )
}
