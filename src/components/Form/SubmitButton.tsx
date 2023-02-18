import { Button as PrimaryButton, ButtonProps } from "@mantine/core";
import { useForm } from "@mongez/react-form";
import { HTMLAttributes, useEffect, useState } from "react";

export function SubmitButton({
  children,
  ...props
}: ButtonProps & HTMLAttributes<HTMLButtonElement>) {
  const [isSubmitting, submitting] = useState(false);
  const [isDisabled, disable] = useState(false);
  const formProvider = useForm();

  useEffect(() => {
    if (!formProvider) return;

    const onSubmit = formProvider.form.on("submit", () => {
      submitting(formProvider.form.isSubmitting());
      disable(formProvider.form.isSubmitting());
    });

    const inValidControls = formProvider.form.on("invalidControls", () => {
      disable(true);
    });

    const isDisabledEvent = formProvider.form.on("disable", disable as any);

    const validControl = formProvider.form.on("validControls", () => {
      disable(false);
    });

    return () => {
      onSubmit.unsubscribe();
      validControl.unsubscribe();
      inValidControls.unsubscribe();
      isDisabledEvent.unsubscribe();
    };
  }, [formProvider]);

  return (
    <>
      <PrimaryButton
        type="submit"
        color="blue"
        {...props}
        loading={isSubmitting}
        disabled={isDisabled || isSubmitting}>
        {children}
      </PrimaryButton>
    </>
  );
}
