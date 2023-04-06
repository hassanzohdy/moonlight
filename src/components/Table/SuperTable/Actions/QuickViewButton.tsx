import {
  Box,
  Modal,
  ModalProps,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { trans } from "@mongez/localization";
import { useBooleanState } from "@mongez/react-hooks";
import { IconEye } from "@tabler/icons-react";
import React from "react";
import { FormatterProps } from "../../TableProps";
import { useSuperTable } from "../../hooks";

type ViewOptions = {
  title?: (row: any, rowIndex: number) => React.ReactNode;
  modalOptions?: Partial<ModalProps>;
  rule?: string;
};

const defaultModalOptions: Partial<ModalProps> = {
  size: "lg",
  overlayProps: {
    opacity: 0.5,
  },
  trapFocus: false,
  transitionProps: {
    exitDuration: 500,
  },
};

export type QuickViewButtonProps = {
  row: any;
  rowIndex: number;
  close: () => void;
};

const defaultOptions: ViewOptions = {
  rule: "view",
};

export function quickViewButton(
  Component: React.FC<QuickViewButtonProps>,
  options: ViewOptions = {},
) {
  const buttonOptions = { ...defaultOptions, ...options };
  function QuickViewButton({ row, rowIndex }: FormatterProps) {
    const superTable = useSuperTable();
    const [opened, open, close] = useBooleanState(false);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (superTable.forbids(buttonOptions.rule!, row, rowIndex)) return null;

    const title = (
      <Text size="lg" fw="bold">
        {buttonOptions?.title?.(row, rowIndex) || trans("quickView")}
      </Text>
    );

    return (
      <Box display={"inline-block"} mt={6}>
        <UnstyledButton onClick={open}>
          <Tooltip withArrow label={trans("quickView")} position="top">
            <span>
              <IconEye size={16} stroke={1.5} color="orange" />
            </span>
          </Tooltip>
        </UnstyledButton>

        <Modal
          opened={opened}
          onClose={close}
          title={title}
          {...defaultModalOptions}
          {...(options?.modalOptions || {})}>
          <Component row={row} close={close} rowIndex={rowIndex} />
        </Modal>
      </Box>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  QuickViewButton.permission = buttonOptions.rule!;

  return QuickViewButton;
}
