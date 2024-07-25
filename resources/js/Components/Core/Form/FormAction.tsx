import { forwardRef } from "react";
import { Group, GroupProps } from "@mantine/core";

interface FormActionProps extends GroupProps {}

const FormAction = forwardRef<HTMLDivElement, FormActionProps>(function (
    { justify = "end", gap = "sm", mt = "lg", ...props },
    ref
) {
    return <Group ref={ref} justify={justify} gap={gap} mt={mt} {...props} />;
});
FormAction.displayName = "FormAction";

export default FormAction;
