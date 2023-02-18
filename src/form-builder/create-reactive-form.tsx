import { RestfulEndpoint } from "@mongez/http";
import { memo, useMemo } from "react";
import { InputBuilder, ReactiveForm } from "./";
import { ReactFormComponentProps } from "./types";

export function createReactForm(callback: (reactForm: ReactiveForm) => void) {
  function UsersListForm(props: ReactFormComponentProps) {
    const Form = useMemo(() => {
      const reactiveForm = new ReactiveForm();
      callback(reactiveForm);

      return reactiveForm.asComponent();
    }, []);

    return <Form {...props} />;
  }

  return memo(UsersListForm);
}

export function createSimpleReactiveForm(
  singleName: string,
  service: RestfulEndpoint,
  inputs: InputBuilder[],
  callback?: (reactiveForm: ReactiveForm) => void,
) {
  return createReactForm(reactiveForm => {
    reactiveForm.setInputs(inputs).service(service).singleName(singleName);

    callback?.(reactiveForm);
  });
}
