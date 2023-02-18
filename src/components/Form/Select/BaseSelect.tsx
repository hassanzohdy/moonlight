import { trans } from "@mongez/localization";
import { FormInputProps, HiddenInput } from "@mongez/react-form";
import Is from "@mongez/supportive-is";
import React from "react";
import { SelectHookOptions, useSelect } from "../../../hooks/use-select";
import { defaultSelectProps } from "../../../utils/select";
import { InputWrapper } from "../InputWrapper";

export type SelectInputProps = FormInputProps & {
  data?: any;
  request?: any;
  lazyRequest?: any;
  dynamicRequest?: any;
  except?: any[];
  description?: React.ReactNode;
  mapOption?: (option: any, index: number) => any;
  autoSelectSingleOption?: boolean;
  autoSelectFirstOption?: boolean;
  searchRequest?: (keywords: string) => Promise<any>;
};

export const BaseSelect = (
  Component: React.ComponentType<any>,
  selectHookOptions: SelectHookOptions,
  defaultProps = defaultSelectProps,
) => {
  function _SelectInput({ description, ...props }: SelectInputProps) {
    const {
      name,
      value,
      id,
      required,
      label,
      disabled,
      isLoading,
      changeValue,
      error,
      onSelectOpen,
      visibleElementRef,
      onSearchChange,
      placeholder,
      otherProps,
      dataList,
    } = useSelect(props, selectHookOptions);

    return (
      <>
        {!Is.empty(value) && value !== "null" && (
          <HiddenInput name={name} value={value} />
        )}

        <InputWrapper
          visibleElementRef={visibleElementRef}
          error={error}
          id={id}
          label={label}
          description={description}
          required={required}>
          <Component
            clearable={!required}
            data={dataList}
            disabled={disabled}
            value={value}
            error={error !== null}
            onChange={changeValue}
            id={id}
            onFocus={onSelectOpen}
            onSearchChange={onSearchChange}
            placeholder={
              isLoading
                ? trans("loading")
                : placeholder &&
                  trans(placeholder as any) + (required ? " *" : "")
            }
            {...otherProps}
          />
        </InputWrapper>
      </>
    );
  }

  _SelectInput.defaultProps = defaultProps;

  return React.memo(_SelectInput);
};
