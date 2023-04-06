import { Anchor } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import React from "react";
import { components } from "../../../utils/resolvers";
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

  const props: any = {};

  if (linkSettings.newTab) {
    props["target"] = "_blank";
    props["rel"] = "noopener noreferrer";
  }

  return (
    <Anchor component={components.link} {...props} to={route}>
      {content}
    </Anchor>
  );
}
