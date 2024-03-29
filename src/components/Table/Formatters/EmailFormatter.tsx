import { Anchor } from "@mantine/core";
import { FormatterProps } from "../TableProps";

export function EmailFormatter({ value }: FormatterProps) {
  const href = `mailto:${value}`;

  return (
    <Anchor
      component={"a"}
      href={href}
      // open in new tab
      target="_blank"
      rel="noopener noreferrer">
      {value}
    </Anchor>
  );
}
