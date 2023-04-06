import styled from "@emotion/styled";
import { UnstyledButton } from "@mantine/core";
import { trans } from "@mongez/localization";
import { useBooleanState } from "@mongez/react-hooks";
import { IconPencil } from "@tabler/icons-react";
import React from "react";
import { Tooltip } from "../../Tooltip";
import { EditOptions } from "../TableProps";

const Wrapper = styled.div`
  label: EditColumn;
  &:hover {
    .edit-icon {
      display: inline-block;
    }
  }

  .edit-icon {
    display: none;
    margin-inline-start: 0.5rem;
  }
`;

export function EditColumn({
  FormComponent,
  children,
  row,
  rowIndex,
}: {
  row: any;
  rowIndex: number;
  FormComponent: React.ComponentType<any>;
  children: React.ReactNode;
} & EditOptions) {
  const [opened, open, close] = useBooleanState(false);
  return (
    <Wrapper>
      {children}
      <Tooltip label={trans("edit")}>
        <UnstyledButton className="edit-icon" onClick={open}>
          <IconPencil color="gray" size={18} />
        </UnstyledButton>
      </Tooltip>
      <FormComponent
        open={opened}
        record={row}
        rowIndex={rowIndex}
        onClose={close}
      />
    </Wrapper>
  );
}
