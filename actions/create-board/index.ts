'use server';

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CreateBoard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId } = auth()
    if (!userId) {
        return {
            error: "Unauthorized"
        }
    }
    const { title } = data;
    let board

    try {
        board = await db.board.create({
            data: {
                title
            }
        })
    } catch (error) {
        return {
            error: 'Failed to create'
        }
    }

    revalidatePath(`/board/${board.id}`)
    return {
        data: board
    }
}

// createSafeAction returns a handler which receive data that fit the CreateBoard schema
// the handler's content is above: create a record, catch error and revalidatePath
// if success, return data: board
export const createBoard = createSafeAction(CreateBoard, handler)