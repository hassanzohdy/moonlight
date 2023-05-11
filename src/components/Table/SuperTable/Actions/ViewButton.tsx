import { ActionIcon, Anchor, Tooltip } from "@mantine/core";
import { trans } from "@mongez/localization";
import { IconEyeCheck } from "@tabler/icons-react";
import { components, router } from "../../../../utils/resolvers";
import { FormatterProps } from "../../TableProps";
import { useSuperTable } from "../../hooks/useSuperTable";

export function ViewButton({ row, rowIndex, settings }: FormatterProps) {
  const superTable = useSuperTable();

  if (superTable.forbids("view", row, rowIndex)) return null;

  const route = settings?.route || router.currentRoute() + "/" + row.id;

  return (
    <Anchor component={components.link} to={route}>
      <ActionIcon color="orange" radius={10000} variant="light">
        <Tooltip withArrow label={trans("view")} position="top">
          <span>
            <IconEyeCheck size={16} stroke={1.5} />
          </span>
        </Tooltip>
      </ActionIcon>
    </Anchor>
  );
}

ViewButton.permission = "view";
