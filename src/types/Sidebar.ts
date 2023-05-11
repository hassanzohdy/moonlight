import { MantineColor } from "@mantine/core";
import { Icon } from "@tabler/icons-react";
import React from "react";

export type LinksGroupProps = {
  icon: Icon;
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
