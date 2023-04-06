import {
  IconChevronLeft,
  IconChevronRight,
  TablerIconProps,
} from "@tabler/icons-react";
import { currentDirection } from "../../utils/helpers";

export const ChevronIcon = (props: TablerIconProps) =>
  currentDirection() === "ltr" ? (
    <IconChevronRight {...props} />
  ) : (
    <IconChevronLeft {...props} />
  );
