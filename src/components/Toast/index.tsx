import {
  hideNotification,
  NotificationProps,
  NotificationProviderProps,
  NotificationsProvider,
  showNotification,
  updateNotification,
} from "@mantine/notifications";
import { trans } from "@mongez/localization";
import { atom } from "@mongez/react-atom";
import { Random } from "@mongez/reinforcements";
import { IconCheck } from "@tabler/icons";
import React from "react";
import { X } from "tabler-icons-react";

export { toastConfirm } from "./ToastConfirm";

const toastAtom = atom<NotificationProviderProps>({
  key: "mantine-toast",
  default: {
    position: "top-right",
  } as NotificationProviderProps,
});

export function ToastContainer() {
  const position = toastAtom.useWatcher("position");

  return <NotificationsProvider position={position}></NotificationsProvider>;
}

export function toastSuccess(
  message: React.ReactNode,
  title: React.ReactNode = trans("success"),
  placement: NotificationProviderProps["position"] = "top-right",
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
  placement: NotificationProviderProps["position"] = "top-right",
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
    disallowClose: true,
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
        icon: <X size={16} />,
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
        disallowClose: true,
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
        icon: <X size={16} />,
        ...notificationProps,
      });
    },
  };
}
