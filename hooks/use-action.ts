import { ActionState, FieldError } from "@/lib/create-safe-action";
import { useCallback, useState } from 'react';


type Action<TInput, TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
    onSuccess?: (data: TOutput) => void
    onError?: (error: string) => void
    onComplete?: () => void
}


/**
 * 
 * @param action  // handler, receive validated data and output
 * @param options 
 * @returns 
 */
export const useAction = <TInput, TOutput>(
    action: Action<TInput, TOutput>,
    options: UseActionOptions<TOutput> = {}
) => {
    const [fieldErrors, setFieldErrors] = useState<FieldError<TInput> | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<TOutput | undefined>(undefined)

    const execute = useCallback(
        async (input: TInput) => {
            setIsLoading(true)

            try {
                const result = await action(input)
                if (!result) {
                    return
                }
                if (result.fieldErrors) {
                    setFieldErrors(result.fieldErrors)
                } else {
                    setFieldErrors({})
                }
                if (result.error) {
                    setError(result.error)
                    options.onError?.(result.error)
                }

                if (result.data) {
                    setData(result.data)
                    options.onSuccess?.(result.data)
                }
            } finally {
                setIsLoading(false)
                options.onComplete?.()
            }
        }, [action, options]
    )
    console.log(fieldErrors, 'error')
    return {
        execute,
        data,
        error,
        fieldErrors,
        isLoading
    }
}