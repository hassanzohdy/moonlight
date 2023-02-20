import { ActionIcon, Tooltip } from "@mantine/core";
import { trans } from "@mongez/localization";
import { currentRoute, Link } from "@mongez/react-router";
import { IconLogout } from "@tabler/icons";
import { useSuperTable } from "../../hooks/useSuperTable";
import { FormatterProps } from "../../TableProps";

export function ViewButton({ row, rowIndex, settings }: FormatterProps) {
  const superTable = useSuperTable();

  if (superTable.forbids("view", row, rowIndex)) return null;

  const route = settings?.route || currentRoute() + "/" + row.id;

  return (
    <ActionIcon>
      <Link to={route}>
        <Tooltip withArrow label={trans("view")} position="top">
          <span>
            <IconLogout size={16} stroke={1.5} color="green" />
          </span>
        </Tooltip>
      </Link>
    </ActionIcon>
  );
}

ViewButton.permission = "view";
