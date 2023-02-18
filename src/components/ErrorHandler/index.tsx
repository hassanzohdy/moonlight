import { Alert } from "@mantine/core";
import React from "react";
import { parseError } from "./../../utils/parse-error";

export type ErrorHandlerProps = {
  /**
   * The error that should be parsed and displayed
   */
  error: any;
};

export function ErrorHandler({ error }: ErrorHandlerProps) {
  const errorContent = React.useMemo(() => parseError(error), [error]);

  if (!errorContent) return null;

  return (
    <>
      <Alert>
        <strong style={{ textAlign: "center" }}>{errorContent}</strong>
      </Alert>
    </>
  );
}
