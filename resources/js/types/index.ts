import type { ReactNode } from "react";
import type { Config } from "ziggy-js"

import { User } from "@/models/user";

export interface WithChildren {
    readonly children?: ReactNode;
}

export interface WithChildrenAsFunction {
    readonly children?: ReactNode | (() => {})
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};