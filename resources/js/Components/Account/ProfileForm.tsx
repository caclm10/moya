import { router, usePage } from "@inertiajs/react";
import { Button, Fieldset, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useAuth } from "@/hooks/use-auth";
import { useForm } from "@/hooks/use-form";
import { Form, FormAction, FormItems } from "../Core/Form";

interface Inputs {
    name: string;
    email: string;
}

function ProfileForm() {
    const { user } = useAuth();
    const { props } = usePage();

    const { formState, isLoading, patch, ...form } = useForm<Inputs>({
        url: "/profile",
        defaultValues: {
            name: user.name,
            email: user.email,
        },
    });

    async function handleSubmit(data: Inputs) {
        try {
            await patch(data);
            router.reload({
                only: ["auth"],
                onSuccess: () => {
                    notifications.show({
                        title: "Success",
                        message: "Profile has been updated successfully.",
                        color: "green",
                    });
                },
            });
        } catch (error) {}
    }

    return (
        <Form
            form={{
                clearErrors: form.clearErrors,
                handleSubmit: form.handleSubmit,
            }}
            onSubmit={handleSubmit}
        >
            <Fieldset legend="Profile">
                <FormItems>
                    <TextInput
                        label="Name"
                        placeholder="Name"
                        error={formState.errors.name?.message}
                        {...form.register("name")}
                    />
                    <TextInput
                        label="Email address"
                        placeholder="Email address"
                        error={formState.errors.email?.message}
                        {...form.register("email")}
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

export default ProfileForm;
