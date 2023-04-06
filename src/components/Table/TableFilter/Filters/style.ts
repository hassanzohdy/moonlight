import styled from "@emotion/styled";
import { SubmitButton } from "../../../Form";

export const FilterWrapper = styled<any>("div")`
  label: FilterWrapper;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin: 1.5rem 0;
  flex-wrap: wrap;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: inherit;
  }
`;

export const ButtonWrapper = styled<any>("div")`
  label: ButtonWrapper;
  gap: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
export const SubmitFilter = styled<any>(SubmitButton)`
  label: SubmitFilter;
  margin-right: 1rem;
`;
