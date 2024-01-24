import { List } from "@prisma/client"
import { ListHeader } from "./list-header"

interface ListItemProps {
  data: List
  index: number
}

export function ListItem({ data, index }: ListItemProps) {
  return (
    <li className="h-full shrink-0 select-none w-[272px]">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} />
      </div>
    </li>
  )
}
