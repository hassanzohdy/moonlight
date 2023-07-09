import { Box } from "@mantine/core";
import { trans } from "@mongez/localization";
import { Form } from "@mongez/react-form";
import {
  IconFilter,
  IconMaximize,
  IconMinimize,
  IconRotateClockwise,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { SubmitButton } from "../../../Form";
import { useSuperTable } from "../../hooks/useSuperTable";
import { ButtonWrapper, FilterWrapper } from "./style";

export function TableFilterForm() {
  const superTable = useSuperTable();
  const [viewAllFilters, toggleFilters] = useState(
    superTable.getCached("viewAllFilters") || false,
  );

  const filters = useMemo(() => {
    let filtersList = superTable.getFilters();

    if (superTable.hasTooManyFilters && !viewAllFilters) {
      filtersList = filtersList.slice(0, superTable.maxFilters);
    }

    return filtersList.map(
      ({ componentProps, wrapperProps = {}, component: Component }, index) => {
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
  }, [superTable.filters, viewAllFilters]);

  const toggleDisplayedFilters = () => {
    const newState = !viewAllFilters;
    toggleFilters(newState);

    superTable.cache("viewAllFilters", newState);
  };

  if (superTable.filters.length === 0) return null;

  return (
    <Form
      ignoreEmptyValues
      id={superTable.tableFilterFromId}
      onSubmit={superTable.submitFilter.bind(superTable)}>
      <Box>
        <FilterWrapper>
          {filters}
          <Box>
            <ButtonWrapper>
              {superTable.hasTooManyFilters && (
                <SubmitButton
                  onClick={toggleDisplayedFilters}
                  type="button"
                  id="reset-btn"
                  color={!viewAllFilters ? "pink" : "grape"}
                  variant="light"
                  leftIcon={
                    viewAllFilters ? <IconMinimize /> : <IconMaximize />
                  }>
                  {trans(
                    "moonlight." +
                      (viewAllFilters ? "showLessFilters" : "showAllFilters"),
                  )}
                </SubmitButton>
              )}
              <SubmitButton
                onClick={superTable.resetFilters.bind(superTable)}
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
