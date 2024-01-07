import Image from "@/node_modules/next/image"
import Link from "next/link"
import localFont from "next/font/local"

import { cn } from "@/lib/utils"

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
})

const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden md:flex items-center gap-x-2 transition hover:opacity-75">
        <Image src="/logo.svg" alt="Logo" height={30} width={30}></Image>
        <p
          className={cn("text-lg text-neutral-700 pb-1", headingFont.className)}
        >
          Taskify
        </p>
      </div>
    </Link>
  )
}

export { Logo }
