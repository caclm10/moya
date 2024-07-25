import { router } from "@inertiajs/react";
import { ActionIcon, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";

import { handleHttpError } from "@/lib/axios";
import { useAxios } from "@/hooks/use-axios";

interface NoteDeleteButtonProps {
    ulid: string;
}

function NoteDeleteButton({ ulid }: NoteDeleteButtonProps) {
    const { isLoading, destroy } = useAxios();

    function handleClick() {
        modals.openConfirmModal({
            title: "Delete note",
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete this note? This action is
                    destructive and cannot be undone.
                </Text>
            ),
            labels: { confirm: "Delete note", cancel: "Cancel" },
            confirmProps: { color: "red" },
            onConfirm: async () => {
                try {
                    await destroy(`/notes/${ulid}`);
                    router.visit("/notes");
                } catch (error) {
                    handleHttpError(error);
                }
            },
        });
    }
    return (
        <ActionIcon
            color="red"
            variant="subtle"
            aria-label="Delete note"
            loading={isLoading}
            onClick={handleClick}
        >
            <IconTrash className="ai-icon" />
        </ActionIcon>
    );
}

export default NoteDeleteButton;
