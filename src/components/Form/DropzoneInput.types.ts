import { DropzoneProps } from "@mantine/dropzone";
import { FormInputProps } from "@mongez/react-form";

export type DropzoneInputProps = FormInputProps &
  Partial<DropzoneProps> & {
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
