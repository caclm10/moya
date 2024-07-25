import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

function useAuth() {
    const { props } = usePage<PageProps>()

    const { auth } = props

    return auth
}

export { useAuth }