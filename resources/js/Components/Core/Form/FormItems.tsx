import { Stack, type StackProps } from "@mantine/core";
import { forwardRef } from "react";

interface FormItemsProps extends StackProps {}

const FormItems = forwardRef<HTMLDivElement, FormItemsProps>(function (
    { gap = "md", ...props },
    ref
) {
    return <Stack ref={ref} gap={gap} {...props} />;
});
FormItems.displayName = "FormItems";

export default FormItems;
