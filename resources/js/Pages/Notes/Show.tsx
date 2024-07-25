import type { ReactNode } from "react";
import { AppShell, Space } from "@mantine/core";

import { PageProps } from "@/types";
import { Note } from "@/models/note";
import { NoteLayout } from "@/Layouts";
import { NoteContent, NoteTitle } from "@/Components/Note";

function Show({ note }: PageProps<{ note: Note }>) {
    if (!note) return;

    return (
        <AppShell.Main>
            <NoteTitle ulid={note.ulid} title={note.title} />

            <Space h="md" />

            <NoteContent ulid={note.ulid} content={note.content} />
        </AppShell.Main>
    );
}

Show.layout = (page: ReactNode) => {
    return <NoteLayout children={page} />;
};

export default Show;
