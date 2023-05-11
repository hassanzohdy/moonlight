import { RestfulEndpoint } from "@mongez/http";
import { trans } from "@mongez/localization";
import { memo, useMemo } from "react";
import {
  InputBuilder,
  ReactiveForm,
  cancelButton,
  resetButton,
  saveAndClearButton,
  submitButton,
} from "./";
import { ReactiveFormComponentProps } from "./types";

const buttonsList = () => [
  cancelButton(),
  resetButton(),
  saveAndClearButton().when(button => {
    return button.reactiveForm.hasRecordId() === false;
  }),
  submitButton(trans("save")),
];

export function createReactiveForm(
  callback: (reactForm: ReactiveForm) => void,
) {
  function ReactiveFormComponent(props: ReactiveFormComponentProps) {
    const Form = useMemo(() => {
      const reactiveForm = new ReactiveForm();
      reactiveForm.buttons(buttonsList());
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
  callback?: (reactiveForm: ReactiveForm) => void,
) {
  return createReactiveForm(reactiveForm => {
    reactiveForm
      .setInputs(inputs)
      .service(service)
      .singleName(singleName)
      .buttons(buttonsList());

    callback?.(reactiveForm);
  });
}
