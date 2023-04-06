import { useOnce } from "@mongez/react-hooks";
import { pressedHotKeys } from "../utils/pressed-hot-keys";

export type HotKeyOptions = {
  keys: string[];
  callback: (event: KeyboardEvent) => void;
  ignoreKeys?: string[];
  preventDefault?: boolean;
};

export function useHotKeys(options: HotKeyOptions) {
  useOnce(() => {
    const eventCallback = (event: KeyboardEvent) => {
      if (pressedHotKeys(options.keys, event, options.ignoreKeys)) {
        if (options.preventDefault || options.preventDefault === undefined) {
          event.preventDefault();
        }

        options.callback(event);
      }
    };

    document.addEventListener("keydown", eventCallback);

    return () => {
      document.removeEventListener("keydown", eventCallback);
    };
  });
}
