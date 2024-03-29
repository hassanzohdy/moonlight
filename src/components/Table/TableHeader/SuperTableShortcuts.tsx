import { Box, Kbd, Modal, Table, Text, Title } from "@mantine/core";
import { trans } from "@mongez/localization";
import { useBooleanState, useOnce } from "@mongez/react-hooks";
import { IconKeyboard } from "@tabler/icons-react";
import { modButtons } from "../../../utils";
import { Tooltip } from "../../Tooltip";
import { useSuperTable } from "../hooks";
import { useHotKeys } from "./../../../hooks/use-hot-keys";
import { moonlightTranslations } from "./../../../locales";

export default function SuperTableShortcuts() {
  const superTable = useSuperTable();
  const [isOpened, open, close] = useBooleanState();

  useHotKeys({
    keys: ["mod", "h"],
    callback: open,
  });

  useOnce(() => {
    return superTable.registerKeyboardShortcut({
      keys: ["mod", "H"],
      description: trans("moonlight.helpShortcut"),
      order: 0,
    });
  });

  if (!superTable.shortcuts) return null;

  return (
    <>
      <Tooltip
        label={
          trans("moonlight.keyboardShortcuts") + ` (${modButtons(["H"])})`
        }>
        <Kbd
          onClick={open}
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
          }}>
          <IconKeyboard />
        </Kbd>
      </Tooltip>

      <Modal
        size="lg"
        title={<Title>{trans(moonlightTranslations.keyboardShortcuts)}</Title>}
        opened={isOpened}
        onClose={close}>
        <Table striped highlightOnHover>
          <tbody>
            {superTable.getKeyboardShortcuts().map(shortcut => {
              return (
                <tr key={shortcut.keys.join("+")}>
                  <td>{shortcut.description}</td>
                  <td>
                    {shortcut.keys.map((key, index) => {
                      return (
                        <Text key={key} weight={700} span>
                          {index > 0 && (
                            <Box component="span" mx="xs">
                              +
                            </Box>
                          )}
                          <Kbd>{key}</Kbd>
                        </Text>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Modal>
    </>
  );
}
