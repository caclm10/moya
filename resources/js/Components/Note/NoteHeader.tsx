import { AppShellHeader, Box, Burger, Group, Text } from "@mantine/core";

import { useNoteShell } from "./NoteShell.context";
import { useNote } from "@/hooks/use-note";
import NoteDeleteButton from "./NoteDeleteButton";

import classes from "./NoteShell.module.css";
import NoteCloseButton from "./NoteCloseButton";

function NoteHeader() {
    const { opened, toggle } = useNoteShell();

    const note = useNote();

    return (
        <AppShellHeader className={classes.header}>
            <Group className={classes.headerGroup}>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <Box flex={1}>
                    <Text lineClamp={1}>
                        {note && (note.title || "Untitled")}
                    </Text>
                </Box>

                {note && (
                    <>
                        <NoteDeleteButton ulid={note.ulid} />

                        <NoteCloseButton />
                    </>
                )}
            </Group>
        </AppShellHeader>
    );
}

export default NoteHeader;
