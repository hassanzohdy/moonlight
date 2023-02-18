import { Anchor } from "@mantine/core";
import { Link } from "@mongez/react-router";
import { IconEye } from "@tabler/icons";
import React from "react";
import { FormatterProps } from "../TableProps";

export type LinkFormatterProps = Pick<FormatterProps, "row" | "rowIndex"> & {
  settings: {
    href: (row: any, rowIndex: number) => string;
    content?: (row: any, rowIndex: number) => React.ReactNode;
    newTab?: boolean;
    icon?: React.ElementType<any>;
    iconColor?: string;
  };
};

const defaultSettings: Omit<LinkFormatterProps["settings"], "href"> = {
  icon: IconEye,
};

export function LinkFormatter({ row, rowIndex, settings }: LinkFormatterProps) {
  const linkSettings = { ...defaultSettings, ...settings };

  const route = linkSettings.href(row, rowIndex);
  const Icon = linkSettings.icon as React.ElementType<any>;

  const content = linkSettings.content ? (
    linkSettings.content(row, rowIndex)
  ) : (
    <Icon color={linkSettings.iconColor} />
  );

  return (
    <Anchor component={Link} newTab={settings?.newTab} to={route}>
      {content}
    </Anchor>
  );
}
