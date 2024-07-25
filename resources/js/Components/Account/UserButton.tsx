import { router } from "@inertiajs/react";
import { Avatar, Box, Button, Group, Menu, Text } from "@mantine/core";
import { IconLogout, IconSelector, IconUserCircle } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import { useAuth } from "@/hooks/use-auth";
import AccountModal from "./AccountModal";
import classes from "./UserButton.module.css";

function UserButton() {
    const { user } = useAuth();

    const [accountModalIsOpened, accountModalAction] = useDisclosure();

    function handleClickLogout() {
        router.post("/logout");
    }

    return (
        <>
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <Button
                        component="div"
                        color="var(--mantine-color-text)"
                        variant="subtle"
                        justify="stretch"
                        size="compact-md"
                        fullWidth
                        classNames={{
                            root: classes.root,
                            label: classes.rootLabel,
                        }}
                    >
                        <Group gap="sm" className={classes.group}>
                            <Avatar src={user.picture_url} radius="xl" />

                            <Box flex={1}>
                                <Text size="sm" className={classes.name}>
                                    {user.name}
                                </Text>

                                <Text size="xs" className={classes.email}>
                                    {user.email}
                                </Text>
                            </Box>

                            <IconSelector className={classes.selectorIcon} />
                        </Group>
                    </Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item
                        leftSection={
                            <IconUserCircle className={classes.menuItemIcon} />
                        }
                        onClick={accountModalAction.open}
                    >
                        Account
                    </Menu.Item>
                    <Menu.Item
                        color="red"
                        leftSection={
                            <IconLogout className={classes.menuItemIcon} />
                        }
                        onClick={handleClickLogout}
                    >
                        Log out
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>

            <AccountModal
                opened={accountModalIsOpened}
                onClose={accountModalAction.close}
            />
        </>
    );
}

export default UserButton;
