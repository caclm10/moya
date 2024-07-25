import { ChangeEvent, useId } from "react";
import { router } from "@inertiajs/react";
import { Avatar, Center, LoadingOverlay, Menu } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

import { handleHttpError } from "@/lib/axios";
import { useAuth } from "@/hooks/use-auth";
import { useAxios } from "@/hooks/use-axios";

import classes from "./ProfilePictureForm.module.css";
import { notifications } from "@mantine/notifications";

function ProfilePictureForm() {
    const { user } = useAuth();
    const { isLoading, post, destroy } = useAxios();
    const inputId = useId();

    async function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const formData = new FormData();
        formData.append("_method", "PATCH");
        formData.append("image", files[0]);

        try {
            await post("/profile/picture", formData);
            router.reload({
                only: ["auth"],
                onSuccess: () => {
                    notifications.show({
                        title: "Success",
                        message:
                            "Profile picture has been updated successfully.",
                        color: "green",
                    });
                },
            });
        } catch (error) {
            handleHttpError(error);
        }
    }

    async function handleClickRemove() {
        try {
            await destroy("/profile/picture");
            router.reload({
                only: ["auth"],
                onSuccess: () => {
                    notifications.show({
                        title: "Success",
                        message:
                            "Profile picture has been removed successfully.",
                        color: "green",
                    });
                },
            });
        } catch (error) {
            handleHttpError(error);
        }
    }

    return (
        <div>
            <input
                type="file"
                id={inputId}
                className="hidden"
                onChange={handleChange}
            />

            <Center>
                <Menu shadow="md">
                    <Menu.Target>
                        <div className={classes.avatarWrapper}>
                            <Avatar
                                src={user.picture_url}
                                radius="99999"
                                size="108"
                            />

                            <LoadingOverlay
                                visible={isLoading}
                                loaderProps={{
                                    size: "xs",
                                }}
                            />
                        </div>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item
                            component="label"
                            htmlFor={inputId}
                            leftSection={
                                <IconPencil className="menu-item-icon" />
                            }
                        >
                            Change Picture
                        </Menu.Item>
                        <Menu.Item
                            color="red"
                            leftSection={
                                <IconTrash className="menu-item-icon" />
                            }
                            onClick={handleClickRemove}
                        >
                            Remove Picture
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Center>
        </div>
    );
}

export default ProfilePictureForm;
