import { atom } from "@mongez/react-atom";
import { DropzoneManager } from "./DropzoneManager";

export const dropzoneAtom = atom<DropzoneManager>({
  key: "dropzone",
  default: {},
});
