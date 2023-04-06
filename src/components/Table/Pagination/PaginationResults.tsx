import { Card, Flex, Text } from "@mantine/core";
import { trans } from "@mongez/localization";
import { moonlightTranslations } from "../../../locales";
import { usePaginationInfo } from "../hooks/usePaginationInfo";
import { useSuperTable } from "../hooks/useSuperTable";
import { themeAtom } from "./../../../atoms";

export function PaginationResults() {
  const paginationInfo = usePaginationInfo();
  const superTable = useSuperTable();
  const isDarkMode = themeAtom.get("colorScheme") === "dark";

  if (!superTable.isPaginationEnabled()) return null;

  return (
    <Flex mb={16}>
      <Card fz="sm" shadow={"xs"} w={"100%"} py={5} px={24}>
        <Text color={isDarkMode ? "white" : "gray"}>
          {trans(moonlightTranslations.tableResultsInfo, {
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
