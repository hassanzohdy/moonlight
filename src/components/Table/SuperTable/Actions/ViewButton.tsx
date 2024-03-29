import { ActionIcon, Anchor, Tooltip } from "@mantine/core";
import { trans } from "@mongez/localization";
import { useOnce } from "@mongez/react-hooks";
import { IconEyeCheck } from "@tabler/icons-react";
import { useHotKeys } from "../../../../hooks";
import { components, router } from "../../../../utils/resolvers";
import { FormatterProps } from "../../TableProps";
import { useSuperTable } from "../../hooks/useSuperTable";

export function ViewButton({ row, rowIndex, settings }: FormatterProps) {
  const superTable = useSuperTable();
  const route = settings?.route?.(row) || superTable.route + "/" + row.id;

  useHotKeys({
    keys: ["mod", "shift", "v"],
    callback: () => {
      if (superTable.forbids("view", row, rowIndex)) return;
      router.navigateTo(route);
    },
  });

  useOnce(() => {
    return superTable.registerKeyboardShortcut({
      keys: ["mod", "shift", "v"],
      description: trans("moonlight.viewRecordShortcut"),
      order: 1,
      once: true,
    });
  });

  if (superTable.forbids("view", row, rowIndex)) return null;

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
