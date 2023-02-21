import { Anchor, Breadcrumbs } from "@mantine/core";
import { trans } from "@mongez/localization";
import { Link } from "@mongez/react-router";
import React, { useMemo } from "react";

export type BreadCrumbType = {
  title: React.ReactNode;
  href: string;
};

export type BreadcrumbListProps = {
  list: BreadCrumbType[];
  withHome?: boolean;
};

export function BreadCrumbList({ list, withHome }: BreadcrumbListProps) {
  const listContent = useMemo(() => {
    const returnedList = [...list];

    if (withHome) {
      list.unshift({
        title: trans("home"),
        href: "/",
      });
    }

    return returnedList.map((item, index) => (
      <Anchor component={Link} key={index} to={item.href}>
        {item.title}
      </Anchor>
    ));
  }, [list, withHome]);

  return (
    <Breadcrumbs mb={12} separator="→">
      {listContent}
    </Breadcrumbs>
  );
}

export function breadCrumb(
  title: BreadCrumbType["title"],
  href: BreadCrumbType["href"]
) {
  return { title, href };
}
