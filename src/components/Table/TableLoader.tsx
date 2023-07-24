import { LoadingOverlay } from "@mantine/core";
import { trans } from "@mongez/localization";
import { useRef } from "react";
import { moonlightTranslations } from "../../locales";
import { toastLoading } from "../toasters";
import { useSuperTable } from "./hooks/useSuperTable";
import { useTableChange } from "./hooks/useTableChange";

export function TableLoader() {
  useTableChange("loading");
  const superTable = useSuperTable();
  const loaderRef = useRef<any>();

  if (superTable.loadMode === "full") {
    return <LoadingOverlay visible={superTable.isLoading} overlayBlur={2} />;
  }

  // the set time out because of this component is called immediately after the load state is changed
  setTimeout(() => {
    if (loaderRef.current) {
      loaderRef.current.close();
    }

    if (!superTable.isLoading) {
      loaderRef.current = null;
    } else {
      loaderRef.current = toastLoading(
        trans(moonlightTranslations.pleaseWaitTableIsLoading),
        trans(moonlightTranslations.loading),
      );
    }
  }, 10);

  return null;
}
