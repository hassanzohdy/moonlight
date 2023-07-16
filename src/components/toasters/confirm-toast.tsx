import { MantineColor, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { trans } from "@mongez/localization";
import React from "react";

export function toastConfirm(
  header: React.ReactNode,
  message: React.ReactNode,
  options: {
    color?: MantineColor;
    confirmLabel?: string;
    cancelLabel?: string;
  } = {},
): Promise<boolean> {
  const defaultOptions = {
    color: "red",
    confirmLabel: trans("moonlight.confirm"),
    cancelLabel: trans("moonlight.cancel"),
  };

  return new Promise(resolve => {
    const { confirmLabel, color, cancelLabel, ...currentOptions } = {
      ...defaultOptions,
      ...options,
    };

    openConfirmModal({
      title:
        typeof header === "string" ? (
          <Text fw="bold" color="red.7">
            {header}
          </Text>
        ) : (
          header
        ),
      centered: true,
      trapFocus: false,
      transitionProps: {
        exitDuration: 400,
      },
      children: <Text size="sm">{message}</Text>,
      labels: {
        confirm: confirmLabel,
        cancel: cancelLabel,
      },
      confirmProps: { color, autoFocus: true },
      onClose: () => resolve(false),
      onConfirm: () => resolve(true),
      ...currentOptions,
    });
  });
}
