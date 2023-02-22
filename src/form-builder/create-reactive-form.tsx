import { RestfulEndpoint } from "@mongez/http";
import { trans } from "@mongez/localization";
import { memo, useMemo } from "react";
import {
  cancelButton,
  InputBuilder,
  ReactiveForm,
  resetButton,
  saveAndClearButton,
  submitButton,
} from "./";
import { reactiveFormComponentProps } from "./types";

export function createReactiveForm(
  callback: (reactForm: ReactiveForm) => void
) {
  function ReactiveFormComponent(props: reactiveFormComponentProps) {
    const Form = useMemo(() => {
      const reactiveForm = new ReactiveForm();
      callback(reactiveForm);

      return reactiveForm.asComponent();
    }, []);

    return <Form {...props} />;
  }

  ReactiveFormComponent.displayName = "ReactiveForm";

  return memo(ReactiveFormComponent);
}

export const createReactForm = createReactiveForm;

export function createSimpleReactiveForm(
  singleName: string,
  service: RestfulEndpoint,
  inputs: InputBuilder[],
  callback?: (reactiveForm: ReactiveForm) => void
) {
  return createReactiveForm((reactiveForm) => {
    reactiveForm
      .setInputs(inputs)
      .service(service)
      .singleName(singleName)
      .buttons([
        cancelButton(),
        resetButton(),
        saveAndClearButton().when((button) => {
          return button.reactiveForm.hasRecordId() === false;
        }),
        submitButton(trans("save")),
      ]);

    callback?.(reactiveForm);
  });
}
