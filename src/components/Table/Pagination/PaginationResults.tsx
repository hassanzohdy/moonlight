import { Card, Flex, Text } from "@mantine/core";
import { trans } from "@mongez/localization";
import { isDarkMode } from "../../../theme";
import { usePaginationInfo } from "../hooks/usePaginationInfo";
import { useSuperTable } from "../hooks/useSuperTable";

export function PaginationResults() {
  const paginationInfo = usePaginationInfo();
  const superTable = useSuperTable();

  if (!superTable.isPaginationEnabled()) return null;

  return (
    <Flex mb={16}>
      <Card fz="sm" shadow={"xs"} w={"100%"} py={5} px={24}>
        <Text color={isDarkMode() ? "white" : "gray"}>
          {trans("tableResultsInfo", {
            current: (
              <Text span fw="bold">
                {paginationInfo.results}
              </Text>
            ),
            total: (
              <Text span fw="bold">
                {paginationInfo.total}
              </Text>
            ),
          })}
        </Text>
      </Card>
    </Flex>
  );
}
