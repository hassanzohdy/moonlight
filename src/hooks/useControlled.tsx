import { capitalize } from "@mongez/reinforcements";
import { useEffect, useMemo, useState } from "react";

export type ControlledHookReturn<T> = [T, (value: T) => void, T, boolean];

export function useControlled<T = never>(
  props: any,
  controlKey: string,
  defaultValue?: T,
): ControlledHookReturn<T> {
  const [controlledValue, setControlledValue] = useState<{
    value: T;
    isControlled: boolean;
  }>(() => {
    // get the controlled value from props
    let value = props[controlKey];

    // if the value is undefined, use the default value
    if (value === undefined || value === null) {
      value = props[`default${capitalize(controlKey)}`];

      // if the value is still undefined, use the default value
      if (value === undefined || value === null) {
        value = defaultValue;
      }
    }

    // return the value
    return {
      value,
      // if the value is undefined, it's not controlled
      isControlled: props[controlKey] !== undefined,
    };
  });

  const initialState = useMemo(() => {
    return controlledValue.value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // if the value is not controlled, stop updating
    if (!controlledValue.isControlled) return;

    // get the new value
    const newValue = props[controlKey];

    // update the value
    setControlledValue({
      value: newValue,
      isControlled: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props[controlKey]]);

  return [
    controlledValue.value as T,
    value => {
      setControlledValue({
        ...controlledValue,
        value,
      });
    },
    initialState,
    controlledValue.isControlled,
  ];
}
