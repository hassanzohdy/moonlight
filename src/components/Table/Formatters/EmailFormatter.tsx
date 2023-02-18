import { Anchor } from "@mantine/core";
import { Link } from "@mongez/react-router";
import { FormatterProps } from "../TableProps";

export function EmailFormatter({ value }: FormatterProps) {
  return (
    <Anchor component={Link} email={value} newTab>
      {value}
    </Anchor>
  );
}
