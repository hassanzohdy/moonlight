import styled from "@emotion/styled";
import { SubmitButton } from "../../../Form";

export const FilterWrapper = styled<any>("div")`
  label: FilterWrapper;
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 1.5rem 0;
  flex-wrap: wrap;
`;

export const ButtonWrapper = styled<any>("div")`
  label: ButtonWrapper;
  gap: 1rem;
  display: flex;
  padding: 1rem 0;
  align-items: center;
`;
export const SubmitFilter = styled<any>(SubmitButton)`
  label: SubmitFilter;
  margin-right: 1rem;
`;
