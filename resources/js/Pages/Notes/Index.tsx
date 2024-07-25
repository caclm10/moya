import type { ReactNode } from "react";
import { AppShell, Text } from "@mantine/core";

import { NoteLayout } from "@/Layouts";

import classes from "./Index.module.css";

function Index() {
    return (
        <AppShell.Main className={classes.root}>
            <Text size="sm" className={classes.text}>
                Select or create a note from the sidebar.
            </Text>
        </AppShell.Main>
    );
}

Index.layout = (page: ReactNode) => {
    return <NoteLayout children={page} />;
};

export default Index;
