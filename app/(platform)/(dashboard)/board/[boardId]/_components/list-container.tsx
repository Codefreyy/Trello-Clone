"use client"

import { ListWithCards } from "@/types"
import { ListForm } from "./list-form"
import { ListItem } from "./list-item"
import { useEffect, useState } from "react"
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import { useAction } from "@/hooks/use-action"
import { toast } from "sonner"
import { updateCardOrder } from "@/actions/update-card-order"
import { updateListOrder } from "@/actions/update-list-order"

interface ListContainerProps {
  data: ListWithCards[]
  boardId: string
}

// put an item after the destiniation position
function reorder<T>(list: T[], startNumber: number, endNumber: number) {
  const array = Array.from(list)
  const [removed] = array.splice(startNumber, 1)
  array.splice(endNumber, 0, removed)
  return array
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data)

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered!")
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reordered!")
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result

    if (!destination) return

    if (
      destination.droppableId == source.droppableId &&
      destination.index == source.index
    ) {
      return
    }

    // user moves a list
    if (type == "list") {
      console.log("I drag the lit")
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({
          ...item,
          order: index,
        })
      ) // after reorder, the index should also be renewed
      setOrderedData(items)
      executeUpdateListOrder({ items, boardId })
    }

    // user moves a card
    if (type == "card") {
      let newOrderedData = [...orderedData]

      // find which list is dragged
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      )
      // find which list is the item dropped in
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      )

      if (!sourceList || !destList) return

      // check if the cards exist in the list ？
      if (!sourceList.cards) {
        sourceList.cards = []
      }

      // check if cards exists on the destList
      if (!destList.cards) {
        destList.cards = []
      }

      // if moving cards in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        )

        reorderCards.forEach((card, index) => {
          card.order = index
        })

        sourceList.cards = reorderCards

        setOrderedData(newOrderedData)
        executeUpdateCardOrder({
          boardId,
          items: reorderCards,
        })
        // moving cards to another list
      } else {
        const [moveCard] = sourceList.cards.splice(source.index, 1)
        moveCard.listId = destination.droppableId
        destList.cards.splice(destination.index, 0, moveCard)

        sourceList.cards.forEach((card, index) => {
          card.order = index
        })

        destList.cards.forEach((card, index) => {
          card.order = index
        })

        setOrderedData(newOrderedData)
        executeUpdateCardOrder({
          boardId,
          items: destList.cards,
        })
      }
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            className="flex gap-x-3 h-full"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {orderedData.map((list, index) => {
              console.log(list)
              return <ListItem key={list.id} index={index} data={list} />
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
