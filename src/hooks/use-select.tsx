import { useFormInput } from "@mongez/react-form";
import { useEvent } from "@mongez/react-hooks";
import { get, trim } from "@mongez/reinforcements";
import Is from "@mongez/supportive-is";
import { useEffect, useRef, useState } from "react";
import { getMoonlightConfig } from "../config";
import { mapData } from "../utils/select";

export type SelectHookOptions = {
  onChange: (value: any, dataList: any[]) => any;
  parseValue: (value: any) => any;
  multiple?: boolean;
};

export function useSelect(
  {
    request,
    dynamicRequest,
    lazyRequest,
    onDropdownOpen,
    data,
    except,
    mapOption,
    searchRequest,
    autoSelectSingleOption,
    autoSelectFirstOption,
    ...props
  }: any,
  { onChange: onChangeProp, parseValue, multiple = false }: SelectHookOptions
) {
  const {
    id,
    label,
    required,
    error,
    placeholder,
    onChange,
    disabled,
    name,
    value,
    otherProps,
    formInput,
    visibleElementRef,
  } = useFormInput(props);

  const [isLoading, loading] = useState(request !== undefined);

  const [dataList, setData] = useState(mapData(data, except, mapOption));
  const [isOpen, setOpen] = useState(false);

  const setDataList = (data: any[]) => {
    setData(data);

    const currentValue = multiple
      ? (value || []).map((value) => String(value))
      : String(value);

    if (!Is.empty(value)) {
      if (multiple) {
        const stringedData = data.map((item) => String(item.value));
        // check for each value if it exists in the new data
        const totalFound = currentValue.filter((value) => {
          return stringedData.includes(value);
        });

        if (totalFound === 0) {
          changeValue([]);
        }
      } else {
        if (!data.find((option) => String(option.value) === currentValue)) {
          changeValue("");
        }
      }
    }

    if (
      (autoSelectSingleOption && data.length === 1) ||
      (autoSelectFirstOption && data.length > 0)
    ) {
      changeValue(String(data[0].value));
    }
  };

  useEffect(() => {
    if (data === undefined) return;

    setData(mapData(data, except, mapOption));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const loadRequest = (request) => {
    if (!request) return;

    loading(true);

    request().then((response: any) => {
      const dataKey = getMoonlightConfig("select.responseDataKey", "records");

      const data: any[] = get(response.data, dataKey, "records");

      setDataList(mapData(data, except, mapOption));
      loading(false);
    });

    const endpoint = getMoonlightConfig("endpoint");

    if (!endpoint) return;

    const selectRequest = endpoint.getLastRequest();

    return () => selectRequest?.abort && selectRequest.abort();
  };

  const lazyRequested = useRef(false);

  useEffect(() => {
    return loadRequest(request);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!dynamicRequest) return;

    return loadRequest(dynamicRequest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dynamicRequest]);

  useEffect(() => {
    if (Is.empty(props.defaultValue)) return;
    if (!lazyRequest) return;

    if (!lazyRequested.current) {
      lazyRequested.current = true;
      loadRequest(lazyRequest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lazyRequest]);

  const changeValue = (newValue: any) => {
    if (newValue === value) return;

    onChange(onChangeProp(newValue, dataList));
  };

  useEvent(() =>
    formInput.on("reset", () => {
      changeValue(formInput.initialValue);
    })
  );

  useEffect(() => {
    if (data === undefined) return;

    setDataList(mapData(data, except, mapOption));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, except]);

  const onSelectOpen = () => {
    onDropdownOpen && onDropdownOpen();

    if (lazyRequested.current) return;

    if (lazyRequest) {
      lazyRequested.current = true;
      loadRequest(lazyRequest);
    }
  };

  const onSearchChange = (keywords: string) => {
    if (!searchRequest || !trim(keywords)) return;

    if (keywords === value) return;

    loadRequest(() => searchRequest(keywords));
  };

  return {
    name,
    value: parseValue(value),
    id,
    onSearchChange,
    setOpen,
    isOpen,
    required,
    label,
    disabled,
    isLoading,
    changeValue,
    error,
    onSelectOpen,
    placeholder,
    otherProps,
    dataList,
    visibleElementRef,
  };
}
