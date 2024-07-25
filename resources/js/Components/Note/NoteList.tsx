import { Link } from "@inertiajs/react";
import { NavLink } from "@mantine/core";
import { IconNotes } from "@tabler/icons-react";

import { useNoteList } from "@/hooks/use-note";
import { useNoteShell } from "./NoteShell.context";

function NoteList() {
    const { close } = useNoteShell();
    const notes = useNoteList();

    return (
        <>
            {notes.map((note) => (
                <NavLink
                    key={note.ulid}
                    component={Link}
                    href={`/notes/${note.ulid}`}
                    label={note.title || "Untitled"}
                    leftSection={<IconNotes size="1rem" stroke={1.5} />}
                    onSuccess={close}
                />
            ))}
        </>
    );
}

export default NoteList;
