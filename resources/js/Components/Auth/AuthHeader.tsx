import { Text, Title } from "@mantine/core";

import classes from "./AuthHeader.module.css";

interface AuthHeaderProps {
    title: string;
    description: string;
}

function AuthHeader({ title, description }: AuthHeaderProps) {
    return (
        <div className={classes.root}>
            <Title order={2} component="h1" className={classes.title}>
                {title}
            </Title>

            <Text size="sm" className={classes.description}>
                {description}
            </Text>
        </div>
    );
}

export default AuthHeader;
