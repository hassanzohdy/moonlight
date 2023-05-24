import { Box, Collapse, Flex, Group, Paper, Text } from "@mantine/core";
import { trans } from "@mongez/localization";
import { IconFilter, IconFilterOff } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { components } from "../../../utils/resolvers";
import LimitOptions from "../Pagination/LimitOptions";
import { TableFilter } from "../TableFilter/Filters/TableFilter";
import { useSuperTable } from "../hooks/useSuperTable";
import { ColumnsSelector } from "./ColumnsSelector";
import SuperTableShortcuts from "./SuperTableShortcuts";
import { Button, RightSide, Wrapper } from "./style";

export function TableHeader() {
  const superTable = useSuperTable();
  const [opened, setOpened] = useState(superTable.isFiltersOpened());

  const bulkActions = useMemo(() => {
    return superTable
      .getBulkActions()
      .map((Component, index) => <Component key={index} />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFilterState = () => {
    setOpened(!opened);

    superTable.updateFiltersState(!opened);
  };

  const createButtons = useMemo(() => {
    return superTable.getCreateButtons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Helmet = components.Helmet();

  if (superTable.displayHeader === false) return null;

  return (
    <>
      {superTable.withHelmet && Helmet && <Helmet title={superTable.title} />}

      <Paper mb={50} shadow="sm" radius="md" p="xs">
        <Wrapper>
          <Box>
            <Text component="h1" my={0} weight={600} size="xl">
              {superTable.title}
            </Text>
          </Box>
          <Flex gap={10} pb={10}>
            {createButtons.map((Button, index) => (
              <Button key={index} />
            ))}
          </Flex>
        </Wrapper>
        <Paper m={"1rem 0"} radius="md">
          <Wrapper>
            {superTable.filters.length > 0 && (
              <Box>
                {opened === true ? (
                  <Button
                    variant="light"
                    color="lime"
                    onClick={toggleFilterState}
                    leftIcon={<IconFilter cursor="pointer" />}>
                    {trans("filters")}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={toggleFilterState}
                    leftIcon={<IconFilterOff cursor="pointer" />}>
                    {trans("filters")}
                  </Button>
                )}
              </Box>
            )}
            <RightSide>
              <Group>
                <LimitOptions />
                <ColumnsSelector />
                {bulkActions}
                <SuperTableShortcuts />
              </Group>
            </RightSide>
          </Wrapper>
          <Collapse in={opened}>
            <TableFilter />
          </Collapse>
        </Paper>
      </Paper>
    </>
  );
}
