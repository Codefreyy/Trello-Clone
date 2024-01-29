import { List } from "@prisma/client"
import { ListHeader } from "./list-header"
import { ElementRef, useRef, useState } from "react"
import { CardForm } from "./card-form"

interface ListItemProps {
  data: List
  index: number
}

export function ListItem({ data, index }: ListItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const textareaRef = useRef<ElementRef<"textarea">>(null)
  function enableEditing() {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }

  function disableEditing() {
    setIsEditing(false)
  }
  return (
    <li className="h-full shrink-0 select-none w-[272px]">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} onAddCard={enableEditing} />
        <CardForm
          ref={textareaRef}
          listId={data.id}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  )
}
