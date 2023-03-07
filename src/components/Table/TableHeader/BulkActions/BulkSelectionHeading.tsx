import styled from "@emotion/styled";
import React from "react";
import { CheckboxInput } from "../../../Form";
import { useSuperTable } from "../../hooks/useSuperTable";

const CheckBoxWrapper = styled.div`
  label: CheckBoxWrapper;
  margin-top: 9px;
`;

export function BulkSelectionHeading() {
  const superTable = useSuperTable();

  return (
    <CheckBoxWrapper>
      <CheckboxInput onChange={superTable.toggleAllBulkSelection} />
    </CheckBoxWrapper>
  );
}
