import { Tooltip as BaseTooltip, TooltipProps } from "@mantine/core";
import React from "react";

function _Tooltip({ children, label, ...otherProps }: TooltipProps, ref) {
  return (
    <span ref={ref}>
      <BaseTooltip withArrow label={label} {...otherProps}>
        {children}
      </BaseTooltip>
    </span>
  );
}

export const Tooltip: React.FC<TooltipProps> = React.forwardRef(_Tooltip);

Tooltip.defaultProps = {
  position: "top",
};
