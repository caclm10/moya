import type { ReactNode } from "react";

import { AuthLayout } from "@/Layouts";
import { AuthHeader, LoginForm } from "@/Components/Auth";

function Login() {
    return (
        <>
            <AuthHeader
                title="Welcome back!"
                description="Let's taking a note again."
            />

            <LoginForm />
        </>
    );
}

Login.layout = (page: ReactNode) => {
    return <AuthLayout children={page} />;
};

export default Login;
