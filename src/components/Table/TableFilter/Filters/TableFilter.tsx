import { Box } from "@mantine/core";
import { trans } from "@mongez/localization";
import { Form } from "@mongez/react-form";
import { IconFilter, IconRotateClockwise } from "@tabler/icons";
import { useMemo } from "react";
import { SubmitButton } from "../../../Form";
import { useSuperTable } from "../../hooks/useSuperTable";
import { ButtonWrapper, FilterWrapper } from "./style";

export function TableFilter() {
  const superTable = useSuperTable();
  const filters = useMemo(() => {
    return superTable
      .getFilters()
      .map(
        (
          { componentProps, wrapperProps = {}, component: Component },
          index,
        ) => {
          if (!Component) return null;

          return (
            <Box key={index} {...wrapperProps}>
              <Component
                {...componentProps}
                onChange={superTable.onFilterInputChange.bind(superTable)}
              />
            </Box>
          );
        },
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [superTable.filters]);

  if (superTable.filters.length === 0) return null;

  return (
    <Form
      id={superTable.tableFilterFromId}
      onSubmit={superTable.submitFilter.bind(superTable)}>
      <Box>
        <FilterWrapper>
          {filters}
          <Box>
            <ButtonWrapper>
              <SubmitButton
                onClick={() => superTable.resetFilters()}
                type="button"
                id="reset-btn"
                color="orange"
                variant="light"
                leftIcon={<IconRotateClockwise />}>
                {trans("reset")}
              </SubmitButton>
              <SubmitButton
                color="teal"
                variant="light"
                leftIcon={<IconFilter />}>
                {trans("filter")}
              </SubmitButton>
            </ButtonWrapper>
          </Box>
        </FilterWrapper>
      </Box>
    </Form>
  );
}
