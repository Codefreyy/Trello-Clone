import { z } from "zod";

export const CreateBoard = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is invalid"
    }).min(3, {
        message: "Title is too short"
    }),
    images: z.string(({
        required_error: "Image is required.",
        invalid_type_error: 'Image is invalid'
    }))
})