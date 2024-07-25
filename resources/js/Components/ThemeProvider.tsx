import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import { theme } from "@/theme";
import type { WithChildren } from "@/types";

function ThemeProvider({ children }: WithChildren) {
    return (
        <MantineProvider theme={theme}>
            <ModalsProvider modalProps={{ zIndex: 10002 }}>
                {children}
            </ModalsProvider>
            <Notifications />
        </MantineProvider>
    );
}

export default ThemeProvider;
