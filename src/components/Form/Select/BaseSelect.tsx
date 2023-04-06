import { trans } from "@mongez/localization";
import { FormControlProps } from "@mongez/react-form";
import { AxiosResponse } from "axios";
import React from "react";
import { SelectHookOptions, useSelect } from "../../../hooks/use-select";
import { defaultSelectProps } from "../../../utils/select";
import { InputWrapper } from "../InputWrapper";

export type SelectInputProps = FormControlProps & {
  data?: any;
  request?: () => Promise<AxiosResponse>;
  lazyRequest?: () => Promise<AxiosResponse>;
  dynamicRequest?: () => Promise<AxiosResponse>;
  responseDataKey?: string;
  except?: any[];
  description?: React.ReactNode;
  mapOption?: (
    option: any,
    index: number,
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
  defaultProps = defaultSelectProps,
) => {
  function _SelectInput(
    { label, placeholder, description, icon, ...props }: SelectInputProps,
    ref: any,
  ) {
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
          required={props.required}>
          <Component
            clearable={!props.required}
            data={dataList}
            disabled={disabled}
            value={value}
            ref={ref}
            error={Boolean(error)}
            onChange={changeValue}
            id={id}
            icon={icon}
            onFocus={onSelectOpen}
            onSearchChange={onSearchChange}
            placeholder={
              isLoading
                ? trans("loading")
                : placeholder
                ? trans(placeholder) + (props.required ? " *" : "")
                : ""
            }
            {...otherProps}
          />
        </InputWrapper>
      </>
    );
  }

  const SelectRef = React.forwardRef(_SelectInput);

  SelectRef.defaultProps = defaultProps;

  return SelectRef;
};
