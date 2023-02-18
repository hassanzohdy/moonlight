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
): Promise<false | any> {
  const defaultOptions = {
    color: "red",
    confirmLabel: trans("confirm"),
    cancelLabel: trans("cancel"),
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
      exitTransitionDuration: 500,
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
