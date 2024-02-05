"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./type";
import { UpdateListOrder } from './schema';


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    }

    const { items, boardId } = data;
    let lists;

    try {
        const transaction = items.map((list) => db.list.update({
            where: {
                id: list.id,
                board: {
                    orgId
                }
            },
            data: {
                // update the order of the data
                order: list.order
            }
        }))

        // combine all the updates into one update and submit
        lists = await db.$transaction(transaction)

    } catch (error) {
        return {
            error: 'Failed to reorder'
        }
    }

    revalidatePath(`/board/${boardId}`)

    return { data: lists }
}

export const updateListOrder = createSafeAction(UpdateListOrder, handler)