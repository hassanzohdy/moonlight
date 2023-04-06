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

export { toastConfirm } from "./ToastConfirm";

export function ToastContainer() {
  const position = toastAtom.useWatcher("position");

  return <Notifications position={position}></Notifications>;
}

export function toastSuccess(
  message: React.ReactNode,
  title: React.ReactNode = trans("success"),
  placement: NotificationsProps["position"] = "top-right",
) {
  toastAtom.update({
    ...toastAtom.value,
    position: placement,
  });

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
  title: React.ReactNode = trans("error"),
  placement: NotificationsProps["position"] = "top-right",
) {
  toastAtom.update({
    ...toastAtom.value,
    position: placement,
  });
  showNotification({
    title,
    message,
    color: "red",
    onClose: () => toastAtom.change("position", "top-right"),
  });
}

export function toastLoading(
  message: React.ReactNode,
  title: React.ReactNode = trans("loading"),
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
      title: React.ReactNode = trans("success"),
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
      title: React.ReactNode = trans("warning"),
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
      title: React.ReactNode = trans("error"),
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
