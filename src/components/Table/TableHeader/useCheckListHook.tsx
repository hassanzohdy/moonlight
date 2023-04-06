import { useState } from "react";

export function useCheckList(defaultCheckedValues: any) {
  const [checkedValues, setCheckedValues] = useState(defaultCheckedValues);

  function toggleValue(value: any, isChecked: boolean) {
    let newValues: any[] = [];
    if (isChecked) {
      newValues = [...checkedValues, value];
    } else {
      newValues = checkedValues.filter((item: any) => item !== value);
    }

    return newValues;
  }

  return [checkedValues, toggleValue, setCheckedValues] as const;
}
