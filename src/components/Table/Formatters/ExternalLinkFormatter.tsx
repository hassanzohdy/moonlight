import { Anchor } from "@mantine/core";
import { FormatterProps } from "../TableProps";

export function ExternalLinkFormatter({
  value,
  row,
  settings,
}: Partial<FormatterProps>) {
  return (
    <Anchor
      component={"a"}
      to={value}
      target="_blank"
      rel="noopener noreferrer"
    >
      {settings.content ? settings.content(row) : value}
    </Anchor>
  );
}
