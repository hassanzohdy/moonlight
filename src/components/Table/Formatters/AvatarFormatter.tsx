import { Group, Text } from "@mantine/core";
import { get, readMoreChars } from "@mongez/reinforcements";
import { getLocalizedValue } from "../../../utils/localization";
import { Tooltip } from "../../Tooltip";
import { FormatterProps } from "../TableProps";
import { ImageFormatter } from "./ImageFormatter";

export function AvatarFormatter({ value, row, settings }: FormatterProps) {
  const { name = "name", limit = 50 } = settings;
  const nameValue = getLocalizedValue(get(row, name, ""));

  return (
    <Group spacing="sm">
      <ImageFormatter value={value} />
      <Tooltip position="top" label={<span>{nameValue}</span>}>
        <Text size="sm" weight={500}>
          {readMoreChars(nameValue, limit)}
        </Text>
      </Tooltip>
    </Group>
  );
}
