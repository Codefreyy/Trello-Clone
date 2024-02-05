import { ListHeader } from "./list-header"
import { ElementRef, useRef, useState } from "react"
import { CardForm } from "./card-form"
import { ListWithCards } from "@/types"
import { cn } from "@/lib/utils"
import { CardItem } from "./card-item"
import { Draggable, Droppable } from "@hello-pangea/dnd"

interface ListItemProps {
  data: ListWithCards
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
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          className="h-full shrink-0 select-none w-[272px]"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
          >
            <ListHeader data={data} onAddCard={enableEditing} />
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "flex flex-col gap-y-2 mx-1 px-1 py-0.5 ",
                    data.cards.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {data?.cards.map((card, index) => (
                    <CardItem data={card} key={card.id} index={index} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>

            <CardForm
              ref={textareaRef}
              listId={data.id}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  )
}
