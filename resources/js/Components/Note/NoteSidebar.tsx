import clsx from "clsx";
import {
    ActionIcon,
    AppShell,
    Burger,
    Group,
    Stack,
    Text,
    Title,
} from "@mantine/core";

import { useNoteShell } from "./NoteShell.context";
import { UserButton } from "../Account";
import NoteList from "./NoteList";
import NewNoteButton from "./NewNoteButton";

import classes from "./NoteShell.module.css";

function NoteSidebar() {
    const { opened, toggle } = useNoteShell();

    return (
        <AppShell.Navbar className={classes.navbar}>
            <Stack gap="xs">
                <Group className={classes.navbarSection}>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Text className={classes.navbarBrand}>Moya</Text>
                </Group>

                <div className={classes.navbarSection}>
                    <UserButton />
                </div>

                <div
                    className={clsx(
                        classes.navbarSection,
                        classes.navbarNotesSection
                    )}
                >
                    <Group className={classes.navbarNotesHeader}>
                        <Title order={4} className={classes.navbarNotesTitle}>
                            Notes
                        </Title>

                        <NewNoteButton />
                    </Group>

                    <NoteList />
                </div>
            </Stack>
        </AppShell.Navbar>
    );
}

export default NoteSidebar;
