import { notifications } from "@mantine/notifications";
import axios, { isAxiosError } from "axios";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

const httpClient = axios.create({
    headers: {
        common: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }
});

function handleHttpError(error: unknown, except?: number[]) {
    let message = "An unknown error occurred.";

    if (isAxiosError(error)) {
        if (except && error.response && except.includes(error.response.status)) return;

        if (error.response?.data.message) {
            message = error.response.data.message
        }
    }

    notifications.show({
        title: "Uh oh, something went wrong.",
        message,
        color: "red",
    })
}

function handleValidationError<TFieldValues extends FieldValues = any>(error: unknown, setError: UseFormSetError<TFieldValues>) {
    if (!isAxiosError(error) || error.response?.status !== 422) return

    const errors = error.response.data.errors

    for (const field in errors) {
        const messages = errors[field];

        setError(field as Path<TFieldValues>, {
            type: "manual",
            message: messages[0]
        })

    }
}

export { httpClient, handleHttpError, handleValidationError }