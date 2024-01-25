'use server'

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { DeleteList } from './schema';
import { InputType, ReturnType } from "./types";
import { redirect } from 'next/navigation';


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()
    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const { id, boardId } = data


    try {
        await db.list.delete({
            where: {
                id
            },
        })
    } catch (error) {
        return {
            error: 'Failed to delete'
        }
    }

    revalidatePath(`/board/${boardId}`)
    redirect(`/board/${boardId}`)


}

export const deleteList = createSafeAction(DeleteList, handler)
