import { TableProps as BaseTableProps } from "@mantine/core";
import { useEvent, useOnce } from "@mongez/react-hooks";
import { useEffect, useRef } from "react";
import { getMoonlightConfig } from "../../../config";
import { SuperTable } from "../SuperTable";
import { createButton } from "../SuperTable/Actions/CreateButton";
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
  hovered,
  service,
  permissions = { ...defaultPermissions },
  buttons,
  data,
  form,
  title,
  bulkActions = getMoonlightConfig("table.bulkActions"),
  defaultParams,
  withHelmet,
  filters,
  filterOptions,
  bulkSelection = bulkActions !== undefined && bulkActions.length > 0,
  updateQueryString,
  id,
  lazy = service !== undefined,
  limit = 10,
  page = 1,
  totalPages,
  pagination = true,
  onPageChange,
  onSortChange,
  onFilterChange,
  limitOptions,
  onPageSizeChange,
  keys,
  fetchRecord,
  total,
  defaultRecord,
  sortCallback,
  ...otherProps
}: TableProps & BaseTableProps): SuperTable {
  const { current: superTable } = useRef(new SuperTable(lazy, name));

  if (role) {
    superTable.setRole(role);
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

  useEffect(() => {
    const paginationInfo = superTable.paginationInfo;

    if (paginationInfo.limit !== limit) {
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
    } else {
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
      if (pagination) {
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

    if (!superTable.hasPermission("list")) return;

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

    if (!buttons) {
      buttons = {
        create: [createButton(form)],
      };
    }
  }

  if (buttons) {
    superTable.setButtons(buttons);
  }

  if (title) {
    superTable.setTitle(title);
  }

  superTable.setColumns(columns);

  return superTable;
}
