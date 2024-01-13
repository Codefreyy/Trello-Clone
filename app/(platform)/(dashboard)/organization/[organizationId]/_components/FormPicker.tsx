"use client"
import { useEffect, useState } from "react"
import { unsplash } from "@/lib/unsplash"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import { defaultImages } from "@/constants/images"

interface FormPickerProps {
  id: string
  errors?: Record<string, string[] | undefined>
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [images, setImages] = useState<Array<Record<string, any>>>([])
  const [isLoading, setIsLoading] = useState(false)
  const { pending } = useFormStatus()
  const [selectedImageId, setSelectedImageId] = useState<string>()

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
        console.log(e)
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
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto",
              selectedImageId && image.id !== selectedImageId && "opacity-50"
            )}
            onClick={() => setSelectedImageId(image.id)}
          >
            <Image
              fill
              className="w-5 h-5 rounded-sm"
              src={image.urls.thumb}
              alt="organization image"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
