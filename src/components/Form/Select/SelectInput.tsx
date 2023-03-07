import { Select, SelectProps } from "@mantine/core";
import React from "react";
import { BaseSelect, SelectInputProps } from "./BaseSelect";

export const SelectInput: React.FC<
  Omit<SelectProps, "data"> & SelectInputProps
> = React.memo(
  BaseSelect(Select, {
    multiple: false,
    parseValue: (value) => {
      return String(value);
    },
    onChange: (value, dataList) => {
      return [
        value,
        {
          option: dataList.find((option) => option.value === value),
        },
      ];
    },
  })
);

SelectInput.displayName = "SelectInput";
