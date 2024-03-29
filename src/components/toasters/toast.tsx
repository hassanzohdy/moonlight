import {
  hideNotification,
  NotificationProps,
  Notifications,
  NotificationsProps,
  showNotification,
  updateNotification,
} from "@mantine/notifications";
import { trans } from "@mongez/localization";
import { Random } from "@mongez/reinforcements";
import { IconCheck, IconX } from "@tabler/icons-react";
import React from "react";
import { toastAtom } from "../../atoms/moonlight-toast";

export function ToastContainer() {
  const position = toastAtom.use("position");

  return <Notifications position={position}></Notifications>;
}

export function toastSuccess(
  message: React.ReactNode,
  title: React.ReactNode = trans("moonlight.success"),
  placement: NotificationsProps["position"] = "top-right",
) {
  toastAtom.change("position", placement);

  showNotification({
    title: title,
    message,
    color: "green",
    icon: <IconCheck size={20} />,
    onClose: () => toastAtom.change("position", "top-right"),
  });
}

export function toastError(
  message: React.ReactNode,
  title: React.ReactNode = trans("moonlight.error"),
  options: NotificationsProps = {},
) {
  const { position = "top-right", ...rest } = options;
  toastAtom.change("position", position);
  const toastId = Random.string(8);
  showNotification({
    title,
    message,
    id: toastId,
    color: "red",
    onClose: () => toastAtom.change("position", "top-right"),
    ...rest,
  });

  return {
    close: () => {
      hideNotification(toastId);
    },
  };
}

export function toastLoading(
  message: React.ReactNode,
  title: React.ReactNode = trans("moonlight.loading"),
  closeAfter = 5000,
) {
  const id = Random.string(8);
  showNotification({
    id,
    title,
    message,
    loading: true,
    autoClose: false,
    withCloseButton: true,
  });

  return {
    success: (
      message: React.ReactNode,
      title: React.ReactNode = trans("moonlight.success"),
      notificationProps: Partial<NotificationProps> = {
        color: "green",
        autoClose: closeAfter,
      },
    ) => {
      updateNotification({
        id,
        title,
        message,
        icon: <IconCheck size={16} />,
        ...notificationProps,
      });
    },
    warning: (
      message: React.ReactNode,
      title: React.ReactNode = trans("moonlight.warning"),
      notificationProps: Partial<NotificationProps> = {
        color: "yellow",
        autoClose: closeAfter,
      } as NotificationProps,
    ) => {
      updateNotification({
        id,
        title,
        message,
        icon: <IconX size={16} />,
        ...notificationProps,
      });
    },
    update: (title: React.ReactNode, message?: React.ReactNode) => {
      updateNotification({
        id,
        title,
        message,
        loading: true,
        autoClose: false,
        withCloseButton: true,
      });
    },
    close: () => {
      hideNotification(id);
    },
    error: (
      message: React.ReactNode,
      title: React.ReactNode = trans("moonlight.error"),
      notificationProps: Partial<NotificationProps> = {
        color: "red",
        autoClose: closeAfter,
      },
    ) => {
      updateNotification({
        id,
        title,
        message,
        icon: <IconX size={16} />,
        ...notificationProps,
      });
    },
  };
}
