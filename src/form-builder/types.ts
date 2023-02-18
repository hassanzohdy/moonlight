import { FormControl, FormInterface } from "@mongez/react-form";
import { AxiosResponse } from "axios";
import { ReactiveForm } from "./components";

export type SubmitCallback = (
  event: React.FormEvent,
  form: FormInterface,
  reactiveForm: ReactiveForm,
) => void;

export type CachedRender = {
  heading: React.ReactNode;
  content: React.ReactNode;
};

export type OnErrorCallback = (
  invalidFormControls: FormControl[],
  form: FormInterface,
  reactiveForm: ReactiveForm,
) => void;

export type SaveCallback = (
  response: AxiosResponse<any>,
  reactiveForm: ReactiveForm,
) => void;

export type ShouldTabBeRendered =
  | boolean
  | ((reactiveForm: ReactiveForm) => boolean);

export type ReactFormComponentProps = {
  record?: any;
  rowIndex?: number;
  recordId?: number | string;
  open?: boolean;
  onClose?: () => void;
  onSave?: SaveCallback;
};

export type Callbacks = {
  onSubmit: SubmitCallback[];
  onSave: SaveCallback[];
  onError: OnErrorCallback[];
};
