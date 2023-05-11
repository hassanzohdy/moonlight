import {
  IconChevronLeft,
  IconChevronRight,
  TablerIconsProps,
} from "@tabler/icons-react";
import { currentDirection } from "../../utils/helpers";

export const ChevronIcon = (props: TablerIconsProps) =>
  currentDirection() === "ltr" ? (
    <IconChevronRight {...props} />
  ) : (
    <IconChevronLeft {...props} />
  );
