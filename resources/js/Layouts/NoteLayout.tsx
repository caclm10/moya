import { Head } from "@inertiajs/react";

import type { WithChildren } from "@/types";
import { NoteHeader, NoteShell, NoteSidebar } from "@/Components/Note";

import classes from "./NoteLayout.module.css";

function NoteLayout({ children }: WithChildren) {
    return (
        <>
            <Head>
                <title>Notes</title>
            </Head>

            <NoteShell>
                <NoteSidebar />
                <NoteHeader />
                {children}
            </NoteShell>
            {/* <div className={classes.root}>
                <NoteSidebar />
                {children}
            </div> */}
        </>
    );
}

export default NoteLayout;
