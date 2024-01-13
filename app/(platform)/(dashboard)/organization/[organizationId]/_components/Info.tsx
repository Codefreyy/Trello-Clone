"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { useOrganization } from "@clerk/nextjs"
import { CreditCard } from "lucide-react"
import Image from "next/image"

export const Info = () => {
  const { isLoaded, organization } = useOrganization()
  if (!isLoaded) return <Info.Skeleton />
  return (
    <div className="flex gap-x-4 items-center ">
      <div className="w-[60px] h-[60px] relative">
        <Image
          fill
          className="rounded-md object-cover"
          src={organization?.imageUrl!}
          alt="organization image"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">{organization?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="w-3 h-3 mr-1" />
          Free
        </div>
      </div>
    </div>
  )
}

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="flex items-center gap-x-4 ">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-15 h-5" />
        <div className="flex items-center gap-1">
          <Skeleton className="w-5 h-5" />
          <Skeleton className="w-10 h-5" />
        </div>
      </div>
    </div>
  )
}
