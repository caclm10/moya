import { handleHttpError, handleValidationError } from "@/lib/axios";

import {
    useForm as usePrimitiveForm,
    type FieldValues,
    type UseFormProps as UsePrimitiveFormProps
} from "react-hook-form"
import { useAxios } from "./use-axios";

interface UseFormProps<TFieldValues extends FieldValues = FieldValues, TContext = any> extends UsePrimitiveFormProps<TFieldValues, TContext> {
    url: string;
}

function useForm<TFieldValues extends FieldValues = FieldValues, TContext = any>({ url, ...props }: UseFormProps<TFieldValues, TContext>) {
    const form = usePrimitiveForm(props)

    const { isLoading, patch: _patch, post: _post } = useAxios()

    async function post<D = any, ResData = any>(data?: D) {
        try {
            const res = await _post<D, ResData>(url, data)

            return res
        } catch (error) {
            handleHttpError(error, [422]);

            handleValidationError(error, form.setError);

            throw error
        }
    }

    async function patch<D = any, ResData = any>(data?: D) {
        try {
            const res = await _patch<D, ResData>(url, data)

            return res
        } catch (error) {
            handleHttpError(error, [422]);

            handleValidationError(error, form.setError);

            throw error
        }
    }

    return {
        isLoading,
        post,
        patch,
        ...form
    }
}

export { useForm }