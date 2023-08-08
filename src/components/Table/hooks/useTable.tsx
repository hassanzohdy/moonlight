import { TableProps as BaseTableProps } from "@mantine/core";
import { useEvent, useOnce } from "@mongez/react-hooks";
import { useEffect, useRef } from "react";
import { getMoonlightConfig } from "../../../config";
import { CreateButton, SuperTable } from "../SuperTable";
import { TableProps } from "../TableProps";

const defaultPermissions = {
  list: true,
  create: true,
  update: true,
  delete: true,
};

export function useTable({
  name,
  role = name,
  columns,
  hovered = true,
  service,
  permissions = { ...defaultPermissions },
  data,
  shortcuts,
  form,
  title,
  description,
  bulkActions = getMoonlightConfig("table.bulkActions"),
  defaultParams,
  withHelmet,
  filters,
  filterOptions,
  bulkSelection = bulkActions !== undefined && bulkActions.length > 0,
  updateQueryString,
  id,
  lazy = service !== undefined && data === undefined,
  limit,
  page = 1,
  totalPages,
  createButtons = [CreateButton],
  pagination = true,
  onPageChange,
  onSortChange,
  displayHeader,
  onFilterChange,
  limitOptions,
  onPageSizeChange,
  keys,
  fetchRecord,
  total,
  defaultRecord,
  route,
  rootId,
  scrollTo,
  columnsSelections,
  sortCallback,
  ...otherProps
}: TableProps & BaseTableProps): SuperTable {
  const { current: superTable } = useRef(new SuperTable(lazy, name));

  if (role) {
    superTable.setRole(role);
  }

  if (shortcuts !== undefined) {
    superTable.shortcuts = shortcuts;
  }

  if (rootId) {
    superTable.rootId = rootId;
  }

  if (columnsSelections !== undefined) {
    superTable.columnsSelections = columnsSelections;
  }

  if (displayHeader !== undefined) {
    superTable.displayHeader = displayHeader;
  }

  if (scrollTo !== undefined) {
    superTable.scrollTo = scrollTo;
  }

  superTable.setPermissions(permissions);

  superTable.setOriginalData(data);

  useEvent(() => superTable.onPageChange(onPageChange));

  useEvent(() => superTable.onSortChange(onSortChange));

  useEvent(() => superTable.onFilterChange(onFilterChange));

  useEvent(() => superTable.onPageSizeChange(onPageSizeChange));

  if (sortCallback) {
    superTable.setSortMethod(sortCallback);
  }

  if (defaultRecord) {
    superTable.setDefaultRecord(defaultRecord);
  }

  if (keys) {
    superTable.mergeKeys(keys);
  }

  if (withHelmet !== undefined) {
    superTable.withHelmet = withHelmet;
  }

  if (fetchRecord !== undefined) {
    superTable.fetchRecord = fetchRecord;
  }

  if (route !== undefined) {
    superTable.setRoute(route);
  }

  useEffect(() => {
    const paginationInfo = superTable.paginationInfo;

    if (limit && paginationInfo.limit !== limit) {
      paginationInfo.limit = limit;
    }

    if (paginationInfo.page !== page) {
      paginationInfo.page = page;
    }

    if (total && paginationInfo.total !== total) {
      paginationInfo.total = total;
    }

    let totalResults = total as number;

    if (pagination && !total && data) {
      totalResults = data.length;
    }

    if (totalPages) {
      paginationInfo.pages = totalPages;
    } else if (limit) {
      paginationInfo.pages = Math.ceil(totalResults / limit);
    }

    if (totalResults && limit) {
      // results will be number of results for current page
      paginationInfo.results = Math.min(
        limit,
        totalResults - (page - 1) * limit,
      );
    }

    paginationInfo.total = totalResults;

    if (data) {
      let finalData = data;
      if (pagination && limit) {
        // get only data for current page with limit
        finalData = data.slice((page - 1) * limit, page * limit);
      }

      superTable.setData(finalData);
    }

    superTable.setPaginationInfo(paginationInfo);

    superTable.pagination(pagination);
  }, [data, limit, page, pagination, totalPages, total, superTable]);

  useEffect(() => {
    if (limitOptions === undefined) return;

    superTable.setLimitOptions(limitOptions);
  }, [limitOptions, superTable]);

  useOnce(() => {
    if (!service) return;

    if (!superTable.hasPermission("list") || data !== undefined) return;

    superTable.init();
  });

  if (id) {
    superTable.setId(id);
  }

  superTable.setProps({
    ...otherProps,
    highlightOnHover: hovered,
  });

  if (service) {
    superTable.setService(service);
  }

  if (defaultParams) {
    superTable.setDefaultParams(defaultParams);
  }

  if (filterOptions) {
    superTable.setFilterOptions(filterOptions);
  }

  if (updateQueryString !== undefined) {
    superTable.setUpdateQueryString(updateQueryString);
  }

  if (bulkSelection !== undefined) {
    superTable.enableBulkSelection(bulkSelection);
  }

  if (bulkActions !== undefined) {
    superTable.setBulkActions(bulkActions);
  }

  if (filters) {
    superTable.setFilters(filters);
  }

  if (form) {
    superTable.setBaseForm(form);
  }

  if (createButtons) {
    superTable.setCreateButtons(createButtons);
  }

  if (title) {
    superTable.setTitle(title);
  }

  if (description) {
    superTable.setDescription(description);
  }

  superTable.setColumns(columns);

  return superTable;
}
