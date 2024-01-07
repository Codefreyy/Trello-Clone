import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-2 border-t bg-slate-100">
      <div className="space-x-4  flex items-center justify-end w-full text-xs text-slate-500 font-normal">
        <Button size="sm" variant="ghost">
          Privacy Policy
        </Button>
        <Button size="sm" variant="ghost">
          Terms of Service
        </Button>
      </div>
    </div>
  )
}
