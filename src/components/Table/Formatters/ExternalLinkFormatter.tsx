import { Anchor } from "@mantine/core";
import { Link } from "@mongez/react-router";
import { FormatterProps } from "../TableProps";

export function ExternalLinkFormatter({
  value,
  row,
  settings,
}: Partial<FormatterProps>) {
  return (
    <Anchor component={Link} to={value} newTab>
      {settings.content ? settings.content(row) : value}
    </Anchor>
  );
}
