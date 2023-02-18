import { trans } from "@mongez/localization";
import { SelectInput } from "./Select";

export function StatusInput({ defaultValue }: { defaultValue: any }) {
  return (
    <SelectInput
      required
      name="status"
      defaultValue={defaultValue}
      data={["enabled", "disabled"]}
      label={trans("status")}
      placeholder={trans("status")}
    />
  );
}
