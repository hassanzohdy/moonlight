import React from "react";
import { FormatterProps } from "../../TableProps";

export function rowButtons(buttons: React.FC<any>[]) {
  return function RowButtons({ row, rowIndex }: FormatterProps) {
    return (
      <>
        {buttons.map((Button: React.FC<any>, buttonIndex: number) => (
          <Button key={buttonIndex} row={row} rowIndex={rowIndex} />
        ))}
      </>
    );
  };
}
