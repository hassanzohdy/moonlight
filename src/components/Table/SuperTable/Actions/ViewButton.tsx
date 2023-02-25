import { ActionIcon, Anchor, Tooltip } from "@mantine/core";
import { trans } from "@mongez/localization";
import { IconLogout } from "@tabler/icons";
import { components, router } from "../../../../utils/resolvers";
import { useSuperTable } from "../../hooks/useSuperTable";
import { FormatterProps } from "../../TableProps";

export function ViewButton({ row, rowIndex, settings }: FormatterProps) {
  const superTable = useSuperTable();

  if (superTable.forbids("view", row, rowIndex)) return null;

  const route = settings?.route || router.currentRoute() + "/" + row.id;

  return (
    <ActionIcon color="orange" radius={1000} variant="light">
      <Anchor component={components.link} to={route}>
        <Tooltip withArrow label={trans("view")} position="top">
          <span>
            <IconLogout size={16} stroke={1.5} />
          </span>
        </Tooltip>
      </Anchor>
    </ActionIcon>
  );
}

ViewButton.permission = "view";
