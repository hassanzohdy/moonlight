import { MantineColor } from "@mantine/core";
import { TablerIcon } from "@tabler/icons";
import React from "react";

export type LinksGroupProps = {
  icon: TablerIcon;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
};

export type SidebarLink = {
  label: React.ReactNode;
  route?: string;
  icon?: React.ElementType;
  defaultOpen?: boolean;
  children?: SidebarLink[];
  iconColor?: MantineColor;
  permission?: string;
};
