import { current } from "@mongez/react";
import {
  IconChevronLeft,
  IconChevronRight,
  TablerIconProps,
} from "@tabler/icons";

export const ChevronIcon = (props: TablerIconProps) =>
  current("direction") === "ltr" ? (
    <IconChevronRight {...props} />
  ) : (
    <IconChevronLeft {...props} />
  );
