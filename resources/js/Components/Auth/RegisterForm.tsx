import { Link, router } from "@inertiajs/react";
import {
    Anchor,
    Button,
    Checkbox,
    PasswordInput,
    Text,
    TextInput,
} from "@mantine/core";

import { useForm } from "@/hooks/use-form";
import { Form, FormAction, FormItems } from "../Core/Form";

interface Inputs {
    name: string;
    email: string;
    password: string;
    remember: boolean;
}

function RegisterForm() {
    const { formState, isLoading, post, ...form } = useForm<Inputs>({
        url: "/register",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            remember: false,
        },
    });

    async function handleSubmit(data: Inputs) {
        try {
            await post(data);
            router.visit("notes");
        } catch (error) {
            form.resetField("password", { keepError: true });
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

                <PasswordInput
                    label="Password"
                    placeholder="Password"
                    error={formState.errors.password?.message}
                    {...form.register("password")}
                />

                <div>
                    <Checkbox
                        label="Remember me?"
                        {...form.register("remember")}
                    />
                </div>
            </FormItems>

            <FormAction>
                <Text size="sm" c="var(--mantine-primary-color-filled)">
                    <Anchor component={Link} href="/login">
                        Sign In
                    </Anchor>
                </Text>
                <Button type="submit" loading={isLoading}>
                    Sign Up
                </Button>
            </FormAction>
        </Form>
    );
}

export default RegisterForm;
