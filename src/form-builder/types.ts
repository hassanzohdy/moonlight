import { FormControl, FormInterface } from "@mongez/react-form";
import { AxiosResponse } from "axios";
import { ReactiveForm } from "./components";

export type SubmitCallback = (options: {
  values: Record<string, any>;
  reactiveForm: ReactiveForm;
  form: FormInterface;
  formData: FormData;
}) => void;

export type CachedRender = {
  heading: React.ReactNode;
  content: React.ReactNode;
};

export type ReactiveFormEvent =
  | "close"
  | "formReady"
  | "rendered"
  | "rendering";

export type OnErrorCallback = (
  invalidFormControls: FormControl[],
  form: FormInterface,
  reactiveForm: ReactiveForm
) => void;

export type SaveCallback = (
  response: AxiosResponse<any>,
  reactiveForm: ReactiveForm
) => void;

export type ShouldTabBeRendered =
  | boolean
  | ((reactiveForm: ReactiveForm) => boolean);

export type reactiveFormComponentProps = {
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
