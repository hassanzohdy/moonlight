import { Card, Flex, Text } from "@mantine/core";
import { trans } from "@mongez/localization";
import { themeAtom } from "../../../atoms";
import { usePaginationInfo } from "../hooks/usePaginationInfo";
import { useSuperTable } from "../hooks/useSuperTable";

export function PaginationResults() {
  const paginationInfo = usePaginationInfo();
  const superTable = useSuperTable();

  const themeMode = themeAtom.use("mode");

  if (!superTable.isPaginationEnabled()) return null;

  return (
    <Flex mb={16}>
      <Card fz="sm" shadow={"xs"} w={"100%"} py={5} px={24}>
        <Text color={themeMode === "dark" ? "white" : "gray"}>
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
