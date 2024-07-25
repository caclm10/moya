import {
    forwardRef,
    type FormEvent,
    type FormEventHandler,
    type FormHTMLAttributes,
} from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type FormProps<TFieldValues extends FieldValues = any> =
    | Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> &
          (
              | {
                    form?: undefined;
                    onSubmit?: FormEventHandler<HTMLFormElement>;
                }
              | {
                    form?: Pick<
                        UseFormReturn<TFieldValues>,
                        "clearErrors" | "handleSubmit"
                    >;
                    onSubmit?: (data: TFieldValues) => void;
                }
          );

const Form = forwardRef<HTMLFormElement, FormProps>(function (
    { form, onSubmit, ...props },
    ref
) {
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        if (form) {
            form.clearErrors();

            form.handleSubmit((data) => {
                onSubmit?.(data);
            })(event);
        } else {
            event.preventDefault();
            onSubmit?.(event);
        }
    }

    return <form ref={ref} onSubmit={handleSubmit} {...props} />;
});
Form.displayName = "Form";

export default Form;
