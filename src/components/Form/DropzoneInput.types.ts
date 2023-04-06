import { DropzoneProps } from "@mantine/dropzone";
import { FormControlProps } from "@mongez/react-form";
import { UploadingFileValidationOptions } from "../../utils";

export type DropzoneInputProps = FormControlProps &
  Partial<DropzoneProps> &
  UploadingFileValidationOptions & {
    //
    images?: boolean;
    description?: React.ReactNode;
    hint?: React.ReactNode;
    remoteDelete?: boolean;
  };

export type UploadedFile = {
  file: File;
  state: "initial" | "uploading" | "uploaded" | "error";
  progress: number;
  error?: React.ReactNode;
  index?: number;
  id: string | number;
  url?: string;
};

export type Fileable = {
  id: string | number;
  url: string;
  name: string;
  size?: number;
  type?: string;
};
