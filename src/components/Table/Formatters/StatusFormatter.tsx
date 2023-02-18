import { Badge } from "@mantine/core";
import { trans } from "@mongez/localization";
import { get } from "@mongez/reinforcements";
import { FormatterProps } from "../TableProps";

export function StatusFormatter({ row, value, settings }: FormatterProps) {
  const color = get(settings, `statuses.${value}`, "cyan");

  const content = settings.content ? settings.content(row) : trans(value);

  if (!value) return null;

  return <Badge color={color}>{content}</Badge>;
}
