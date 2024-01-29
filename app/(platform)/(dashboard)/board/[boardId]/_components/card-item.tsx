"use client"

import { Card } from "@prisma/client"

interface CardItemProps {
  data: Card
  index: number
}

export const CardItem = ({ data, index }: CardItemProps) => {
  return (
    <li
      role="button"
      className="truncate border-2 border-transparent rounded-md px-3 py-2 text-sm hover:border-slate-700 bg-white shadow-sm"
    >
      {data.title}
    </li>
  )
}
