import { router } from "@inertiajs/react";
import { ActionIcon } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";

function NoteCloseButton() {
    const [isLoading, toggleIsLoading] = useToggle();

    function handleClick() {
        toggleIsLoading();

        router.visit("/notes");
    }

    return (
        <ActionIcon
            variant="subtle"
            color="var(--mantine-color-dimmed)"
            aria-label="Close note"
            loading={isLoading}
            onClick={handleClick}
        >
            <IconX className="ai-icon" />
        </ActionIcon>
    );
}

export default NoteCloseButton;
