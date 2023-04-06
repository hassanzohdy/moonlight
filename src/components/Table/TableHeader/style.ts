import styled from "@emotion/styled";
import { Button as BaseButton, Box, Menu } from "@mantine/core";

export const Wrapper = styled<any>(Box)`
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const ColumnsSelectorDropdown = styled(Menu.Dropdown)`
  label: ColumnsSelectorDropdown;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const RightSide = styled<any>(Box)({
  marginInlineStart: "auto",
});

export const Button = styled<any>(BaseButton)({
  gap: "1rem",
  display: "flex",
  alignItems: "center",
});
