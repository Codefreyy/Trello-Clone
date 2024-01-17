"use client"
import { useEffect, useState } from "react"
import { unsplash } from "@/lib/unsplash"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useFormStatus } from "react-dom"
import { Check, Loader2 } from "lucide-react"
import { defaultImages } from "@/constants/images"
import Link from "next/link"
import { FormErrors } from "./form-errors"

interface FormPickerProps {
  id: string
  errors?: Record<string, string[] | undefined>
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [images, setImages] = useState<Array<Record<string, any>>>([])
  const [isLoading, setIsLoading] = useState(false)
  const { pending } = useFormStatus()
  const [selectedImageId, setSelectedImageId] = useState(null)

  useEffect(() => {
    async function getImages() {
      try {
        setIsLoading(true)
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        })
        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>
          setImages(newImages)
        } else {
          console.error("Failed to fetch images from Unsplash!")
          setImages(defaultImages)
        }
      } catch (e) {
        setImages(defaultImages)
      } finally {
        setIsLoading(false)
      }
    }

    getImages()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    )
  }
return (
  <div className="relative">
    <div className="grid grid-cols-3 gap-2 mb-2">
      {images.map((image) => (
        <div
          key={image.id}
          // tailwind group hover class enables use to style a child element when hovering over a specific parent element
          className={cn(
            "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
            pending && "opacity-50 hover:opacity-50 cursor-auto"
          )}
          onClick={() => {
            if (pending) return
            setSelectedImageId(image.id)
          }}
        >
          {selectedImageId == image.id && (
            <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center z-20">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
          <input
            type="radio"
            id={id}
            name={id}
            className="hidden"
            checked={selectedImageId === image.id}
            disabled={pending}
            onChange={() => {}}
            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
          />
          <Image
            fill
            className="w-5 h-5 rounded-sm"
            src={image.urls.thumb}
            alt="organization image"
          />
          <Link
            href={image.links.html}
            target="_blank"
            className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
          >
            {image.user.name}
          </Link>
        </div>
      ))}
    </div>
    <FormErrors id={id} errors={errors!} />
  </div>
)
}
