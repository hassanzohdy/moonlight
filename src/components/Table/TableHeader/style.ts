import styled from "@emotion/styled";
import { Box, Button as BaseButton, Menu } from "@mantine/core";

export const Wrapper = styled<any>(Box)({
  gap: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

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
