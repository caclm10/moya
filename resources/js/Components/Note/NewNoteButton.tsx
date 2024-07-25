import { router } from "@inertiajs/react";
import { ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import { handleHttpError } from "@/lib/axios";
import { useAxios } from "@/hooks/use-axios";
import { useNoteShell } from "./NoteShell.context";

function NewNoteButton() {
    const { close } = useNoteShell();
    const { isLoading, post } = useAxios();

    async function handleClick() {
        try {
            const res = await post("/notes");

            close();

            router.visit(`/notes/${res.data.note.ulid}`);
        } catch (error) {
            handleHttpError(error);
        }
    }

    return (
        <ActionIcon
            size="md"
            variant="subtle"
            color="var(--mantine-color-dimmed)"
            loading={isLoading}
            onClick={handleClick}
        >
            <IconPlus className="ai-icon" />
        </ActionIcon>
    );
}

export default NewNoteButton;
