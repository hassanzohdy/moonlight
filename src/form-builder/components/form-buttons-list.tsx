import { trans } from "@mongez/localization";
import React from "react";
import { getMoonlightConfig } from "../../config";
import { FormButton } from "./FormButton";

export function submitButton(
  content: React.ReactNode = getMoonlightConfig(
    "reactiveForm.submitButton.label",
  ),
) {
  return new FormButton()
    .content(content)
    .color("green")
    .name("submit")
    .variant("filled")
    .size("xs");
}

export function formButton(content: React.ReactNode) {
  return new FormButton().content(content).size("xs");
}

export function resetButton(content: React.ReactNode = trans("reset")) {
  return new FormButton()
    .content(content)
    .color("cyan")
    .name("reset")
    .type("button")
    .variant("light")
    .size("xs")
    .onClick(reactiveForm => {
      reactiveForm.reset();
    });
}

export function cancelButton(content: React.ReactNode = trans("cancel")) {
  return new FormButton()
    .content(content)
    .color("red")
    .name("cancel")
    .type("button")
    .variant("light")
    .size("xs")
    .onClick(reactiveForm => {
      reactiveForm.close();
    });
}

export function saveAndClearButton(
  content: React.ReactNode = trans("saveAndClear"),
) {
  return new FormButton()
    .content(content)
    .color("violet")
    .name("saveAndClear")
    .type("button")
    .variant("light")
    .size("xs")
    .onClick(reactiveForm => {
      reactiveForm.saveAndClear();
    });
}
