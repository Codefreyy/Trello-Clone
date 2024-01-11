'use server';

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteBoard(id: string) {
    await db.board.delete({
        where: {
            id
        }
    })

    console.log(id)
    revalidatePath(`/organization/org_2ajQ9Xq3KZe392jfPMKwYTrqxKR`)
}