import { Head } from "@inertiajs/react";
import { Container, Paper, Stack } from "@mantine/core";

import type { WithChildren } from "@/types";

import classes from "./AuthLayout.module.css";

function AuthLayout({ children }: WithChildren) {
    return (
        <>
            <Head>
                <title>Authentication</title>
            </Head>

            <div className={classes.root}>
                <Container maw={448} className={classes.container}>
                    <Paper shadow="md" className={classes.paper}>
                        <Stack gap="lg">{children}</Stack>
                    </Paper>
                </Container>
            </div>
        </>
    );
}

export default AuthLayout;
