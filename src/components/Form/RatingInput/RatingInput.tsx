import { Rating, RatingProps } from "@mantine/core";
import { InputWrapper } from "@mongez/moonlight";
import {
  FormControlProps,
  InputRule,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";
import React, { FC } from "react";

export type RatingInputProps = RatingProps & {
  label?: string;
  readOnly?: boolean;
  rules?: InputRule[];
} & FormControlProps;

function _RatingInput(
  { readOnly, label, ...props }: RatingInputProps,
  ref: any,
) {
  const {
    value,
    changeValue,
    visibleElementRef,
    inputRef,
    error,
    id,
    disabled,
    otherProps,
  } = useFormControl(props);

  return (
    <InputWrapper
      id={id}
      error={error}
      visibleElementRef={visibleElementRef}
      label={label}
      required={props.required}>
      <Rating
        value={value}
        readOnly={readOnly || disabled}
        onChange={changeValue}
        {...otherProps}
        ref={ratingInputRef => {
          inputRef.current = ratingInputRef;
          if (ref) {
            if (typeof ref === "function") {
              ref(ratingInputRef);
            } else {
              ref.current = ratingInputRef;
            }
          }
        }}
      />
    </InputWrapper>
  );
}

export const RatingInput: FC<RatingInputProps> = React.memo(
  React.forwardRef(_RatingInput as any),
);

RatingInput.defaultProps = {
  rules: [requiredRule],
};
