import { MantineTheme } from "@mantine/core";
import { CSSProperties } from "react";
import { themeAtom } from "../atoms";

export type BreakpointValue =
  | ((theme: MantineTheme) => string | number)
  | string
  | number;

export type BreakpointsList = {
  xl?: BreakpointValue;
  lg?: BreakpointValue;
  md?: BreakpointValue;
  sm?: BreakpointValue;
  xs?: BreakpointValue;
  [key: number]: BreakpointValue;
};

export function media(
  direction: "max" | "min",
  property: string,
  breakpointsList: BreakpointsList,
) {
  let text = "";

  // convert breakpoints to numbers
  const breakpoints = Object.keys(breakpointsList)
    .map(breakpoint => ({
      breakpoint:
        typeof breakpoint === "string"
          ? themeAtom.value.breakpoints[breakpoint]
          : breakpoint,
      value:
        typeof breakpointsList[breakpoint] !== "function"
          ? breakpointsList[breakpoint]
          : breakpointsList[breakpoint](themeAtom.value),
    }))
    .sort((a: any, b: any) =>
      direction === "min"
        ? a.breakpoint - b.breakpoint
        : b.breakpoint - a.breakpoint,
    );

  for (const { breakpoint, value } of breakpoints) {
    text += `@media only screen and (${direction}-width: ${breakpoint}px) {
        ${property}: ${value};
}
`;
  }

  return text;
}

media.min = media.bind(null, "min");
media.max = media.bind(null, "max");

export type ResponsiveProperty = {
  base?: BreakpointValue;
  sm?: BreakpointValue;
  md?: BreakpointValue;
  lg?: BreakpointValue;
  xl?: BreakpointValue;
  [key: number]: BreakpointValue;
};

export type StyleSheet = {
  [key in keyof CSSProperties]: string | number | ResponsiveProperty;
};

export function css(stylesheet: StyleSheet) {
  const result: any = {};

  const breakpoints = {
    base: {},
    sm: {},
    md: {},
    lg: {},
    xl: {},
  };

  for (const key in stylesheet) {
    const value = stylesheet[key];

    if (typeof value !== "object") {
      breakpoints.base[key] = value;
      continue;
    } else {
      for (const breakpoint in value) {
        breakpoints[breakpoint][key] = value[breakpoint];
      }
    }
  }

  for (const breakpoint in breakpoints) {
    for (const key in breakpoints[breakpoint]) {
      let value = breakpoints[breakpoint][key];

      if (typeof value === "function") {
        value = value(themeAtom.value);
      }

      if (breakpoint === "base") {
        result[key] = value;
      } else {
        const breakpointMedia = `@media only screen and (min-width: ${themeAtom.value.breakpoints[breakpoint]}px)`;

        if (!result[breakpointMedia]) {
          result[breakpointMedia] = {};
        }

        result[breakpointMedia][key] = value;
      }
    }
  }

  return result;
}
