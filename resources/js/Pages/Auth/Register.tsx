import { ReactNode } from "react";

import { AuthLayout } from "@/Layouts";
import { AuthHeader, RegisterForm } from "@/Components/Auth";

function Register() {
    return (
        <>
            <AuthHeader
                title="Welcome!"
                description="Join and take your note."
            />

            <RegisterForm />
        </>
    );
}

Register.layout = (page: ReactNode) => {
    return <AuthLayout children={page} />;
};

export default Register;
