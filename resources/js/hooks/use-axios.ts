import type { AxiosRequestConfig } from "axios";

import { httpClient } from "@/lib/axios";
import { useState } from "react";

function useAxios() {
    const [isLoading, setIsLoading] = useState(false)

    async function get<D = any>(url: string, config?: AxiosRequestConfig<D>) {
        setIsLoading(true)

        try {
            const res = await httpClient.get(url, config)
            return res
        } finally {
            setIsLoading(false)
        }
    }

    async function post<D = any, ResData = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
        setIsLoading(true)

        try {
            const res = await httpClient.post<ResData>(url, data, config)
            return res
        } finally {
            setIsLoading(false)
        }
    }

    async function patch<D = any, ResData = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
        setIsLoading(true)

        try {
            const res = await httpClient.patch<ResData>(url, data, config)
            return res
        } finally {
            setIsLoading(false)
        }
    }

    async function destroy<D = any, ResData = any>(url: string, config?: AxiosRequestConfig<D>) {
        setIsLoading(true)

        try {
            const res = await httpClient.delete<ResData>(url, config)
            return res
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        get,
        post,
        patch,
        destroy
    }
}

export { useAxios }