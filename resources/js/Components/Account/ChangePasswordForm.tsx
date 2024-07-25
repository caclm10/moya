import { Button, Fieldset, PasswordInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useForm } from "@/hooks/use-form";
import { Form, FormAction, FormItems } from "../Core/Form";

interface Inputs {
    old_password: string;
    new_password: string;
}

function ChangePasswordForm() {
    const { formState, isLoading, patch, ...form } = useForm<Inputs>({
        url: "/password",
        defaultValues: {
            old_password: "",
            new_password: "",
        },
    });

    async function handleSubmit(data: Inputs) {
        try {
            await patch(data);

            notifications.show({
                title: "Success",
                message: "Password has been updated successfully.",
                color: "green",
            });

            form.reset();

            (document.activeElement as HTMLElement).blur();
        } catch (error) {
            form.setFocus("old_password");
            form.reset(undefined, {
                keepErrors: true,
            });
        }
    }

    return (
        <Form
            form={{
                clearErrors: form.clearErrors,
                handleSubmit: form.handleSubmit,
            }}
            onSubmit={handleSubmit}
        >
            <Fieldset title="Change Password">
                <FormItems>
                    <PasswordInput
                        label="Old password"
                        placeholder="Old password"
                        error={formState.errors.old_password?.message}
                        {...form.register("old_password")}
                    />

                    <PasswordInput
                        label="New password"
                        placeholder="New password"
                        error={formState.errors.new_password?.message}
                        {...form.register("new_password")}
                    />
                </FormItems>

                <FormAction>
                    <Button type="submit" loading={isLoading}>
                        Update
                    </Button>
                </FormAction>
            </Fieldset>
        </Form>
    );
}

export default ChangePasswordForm;
