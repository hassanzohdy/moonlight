import { ButtonProps, Button as PrimaryButton } from "@mantine/core";
import { useSubmitButton } from "@mongez/react-form";
import { HTMLAttributes } from "react";

export function SubmitButton({
  children,
  ...props
}: ButtonProps & HTMLAttributes<HTMLButtonElement>) {
  const { isSubmitting, disabled } = useSubmitButton();

  return (
    <>
      <PrimaryButton
        type="submit"
        color="blue"
        {...props}
        loading={isSubmitting}
        disabled={disabled || isSubmitting}>
        {children}
      </PrimaryButton>
    </>
  );
}
