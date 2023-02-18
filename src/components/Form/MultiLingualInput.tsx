import { Grid } from "@mantine/core";
import { ColSpan } from "@mantine/core/lib/Grid/Col/Col.styles";
import { HiddenInput } from "@mongez/react-form";
import React from "react";
import { getMoonlightConfig } from "../../config";
import { getLocalizedValue, multiLingualName } from "../../utils/localization";

export type MultiLingualInputProps = {
  component: React.ComponentType<any>;
  name?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: any;
  [key: string]: any;
  size?: ColSpan;
  localeCodeKey?: string;
  localeCodeTextKey?: string;
  autoFocus?: boolean;
  withFlag?: boolean;
};

function _MultiLingualInput({
  component: Component,
  name,
  placeholder,
  label,
  autoFocus,
  size = "auto",
  defaultValue,
  withFlag = true,
  localeCodeKey = "localeCode",
  localeCodeTextKey = "text",
  ...componentProps
}: MultiLingualInputProps) {
  const localeCodesList: any = getMoonlightConfig("localeCodes", {});

  const localeCodes = Object.keys(localeCodesList);

  return (
    <>
      <Grid>
        {localeCodes.map((localeCode, index) => (
          <Grid.Col span={size} key={localeCode}>
            <HiddenInput
              name={`${name}.${index}.${localeCodeKey}`}
              value={localeCode}
            />
            <Component
              {...componentProps}
              autoFocus={autoFocus && index === 0}
              defaultValue={getLocalizedValue(defaultValue, localeCode)}
              label={label}
              description={
                <div>
                  {localeCodesList[localeCode].name}{" "}
                  {withFlag && localeCodesList[localeCode].flag
                    ? `(${localeCode})`
                    : null}
                </div>
              }
              placeholder={
                placeholder
                  ? placeholder + " " + localeCodesList[localeCode].name
                  : ""
              }
              locale={localeCode}
              name={multiLingualName(name, index, localeCodeTextKey)}
            />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

export const MultiLingualInput = React.memo(_MultiLingualInput);
