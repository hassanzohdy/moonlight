export function pressedHotKeys(
  pressedKeys: string[],
  event: KeyboardEvent,
  ignoreSpecialKeys: string[] = [],
) {
  if (
    ignoreSpecialKeys.length > 0 &&
    pressedHotKeys(ignoreSpecialKeys, event)
  ) {
    return;
  }

  const keys = pressedKeys.map(key => {
    key = key.toLocaleLowerCase();
    if (key === "mod") {
      return event.ctrlKey || event.metaKey;
    }

    if (key === "shift") {
      return event.shiftKey;
    }

    if (key === "ctrl") {
      return event.ctrlKey;
    }

    if (key === "alt") {
      return event.altKey;
    }

    return event.key.toLocaleLowerCase() === key;
  });

  return keys.every(Boolean);
}
