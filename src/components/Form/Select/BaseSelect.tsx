import { trans } from "@mongez/localization";
import { FormInputProps } from "@mongez/react-form";
import { AxiosResponse } from "axios";
import React from "react";
import { SelectHookOptions, useSelect } from "../../../hooks/use-select";
import { defaultSelectProps } from "../../../utils/select";
import { InputWrapper } from "../InputWrapper";

export type SelectInputProps = FormInputProps & {
  data?: any;
  request?: () => Promise<AxiosResponse>;
  lazyRequest?: () => Promise<AxiosResponse>;
  dynamicRequest?: () => Promise<AxiosResponse>;
  responseDataKey?: string;
  except?: any[];
  description?: React.ReactNode;
  mapOption?: (
    option: any,
    index: number
  ) => {
    value: string;
    label: React.ReactNode;
  };
  autoSelectSingleOption?: boolean;
  autoSelectFirstOption?: boolean;
  searchRequest?: (keywords: string) => Promise<AxiosResponse>;
};

export const BaseSelect = (
  Component: React.ComponentType<any>,
  selectHookOptions: SelectHookOptions,
  defaultProps = defaultSelectProps
) => {
  function _SelectInput({
    required,
    label,
    placeholder,
    description,
    icon,
    ...props
  }: SelectInputProps) {
    const {
      value,
      id,
      disabled,
      isLoading,
      changeValue,
      error,
      onSelectOpen,
      visibleElementRef,
      onSearchChange,
      otherProps,
      dataList,
    } = useSelect(props, selectHookOptions);

    return (
      <>
        <InputWrapper
          visibleElementRef={visibleElementRef}
          error={error}
          id={id}
          label={label}
          description={description}
          required={required}
        >
          <Component
            clearable={!required}
            data={dataList}
            disabled={disabled}
            value={value}
            error={Boolean(error)}
            onChange={changeValue}
            id={id}
            icon={icon}
            onFocus={onSelectOpen}
            onSearchChange={onSearchChange}
            placeholder={
              isLoading
                ? trans("loading")
                : placeholder && trans(placeholder as any) + (required && " *")
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
