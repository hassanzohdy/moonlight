import { MantineColor, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { trans } from "@mongez/localization";

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
    const currentOptions = { ...defaultOptions, ...options };
    openConfirmModal({
      title: (
        <Text fw="bold" color="red.7">
          {header}
        </Text>
      ),
      centered: true,
      trapFocus: false,
      transitionProps: {
        exitDuration: 400,
      },
      children: <Text size="sm">{message}</Text>,
      labels: {
        confirm: currentOptions.confirmLabel,
        cancel: currentOptions.cancelLabel,
      },
      confirmProps: { color: currentOptions.color, autoFocus: true },
      onClose: () => resolve(false),
      onConfirm: () => resolve(true),
    });
  });
}
