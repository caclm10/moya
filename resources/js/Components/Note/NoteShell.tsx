import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import type { WithChildren } from "@/types";
import { NoteShellContext } from "./NoteShell.context";

import classes from "./NoteShell.module.css";

function NoteShell({ children }: WithChildren) {
    const [opened, { close, toggle }] = useDisclosure();

    return (
        <NoteShellContext.Provider value={{ opened, close, toggle }}>
            <AppShell
                layout="alt"
                header={{ height: 60 }}
                navbar={{
                    width: 320,
                    breakpoint: "sm",
                    collapsed: { mobile: !opened },
                }}
                // aside={{
                //     width: 300,
                //     breakpoint: "md",
                //     collapsed: { desktop: false, mobile: true },
                // }}
                padding="md"
            >
                {children}
            </AppShell>
        </NoteShellContext.Provider>
    );
}

export default NoteShell;
