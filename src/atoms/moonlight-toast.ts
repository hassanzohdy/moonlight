import { NotificationsProps } from "@mantine/notifications";
import { atom } from "@mongez/react-atom";

export const toastAtom = atom<NotificationsProps>({
  key: "moonlight-toast",
  default: {
    position: "top-right",
  },
});
