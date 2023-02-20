import React from "react";
import {
  FormButton,
  FormRow,
  FormRowColumn,
  InputBuilder,
} from "../components";

export function formRow(
  columns: (FormRowColumn | InputBuilder | FormButton | React.ReactNode)[],
) {
  columns = columns.map(column => {
    if (column instanceof FormRowColumn === false) {
      column = formColumn(column as any);
    }

    return column;
  });

  return new FormRow().setColumns(columns as FormRowColumn[]);
}

export function formColumn(input: InputBuilder | FormButton | React.ReactNode) {
  return new FormRowColumn().setContent(input);
}
