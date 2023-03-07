import { Button, ButtonProps, Text } from "@mantine/core";
import { trans } from "@mongez/localization";
import {
  FormInputProps,
  HiddenInput,
  requiredRule,
  useForm,
  useFormControl,
} from "@mongez/react-form";
import { readMoreChars } from "@mongez/reinforcements";
import { IconRefresh, IconTrash } from "@tabler/icons";
import { useRef, useState } from "react";
import { moonlightTranslations } from "../../locales";
import {
  deleteUploadedFile,
  uploadFiles,
  uploadsHandler,
} from "../../services/upload-service";
import { humanSize } from "../../utils/human-size";
import { toastLoading } from "../Toast";
import { Tooltip } from "../Tooltip";
import { parseError } from "./../../utils/parse-error";
import { InputWrapper } from "./InputWrapper";

type FileInputProps = FormInputProps & {
  buttonLabel?: React.ReactNode;
  buttonProps?: ButtonProps;
  accept?: string;
  description?: React.ReactNode;
  hint?: React.ReactNode;
};

export function FileInput({
  buttonLabel = trans(moonlightTranslations.selectFile),
  buttonProps = {},
  description,
  hint,
  accept,
  label,
  placeholder,
  required,
  ...props
}: FileInputProps) {
  const { value, changeValue, error, id } = useFormControl(props);

  const [isUploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const initialValue = useRef(value);

  const [uploadedFile, setUploadedFile] = useState<any | null>(value);

  const formProvider = useForm();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<any>();

  const openFileSelection = () => {
    fileInputRef.current.click();
  };

  const selectFile = (e: any) => {
    const file: File = e.target.files[0];

    setSelectedFile(file);

    if (!file) return;

    upload(file);

    // clear file input value
    fileInputRef.current.value = "";
  };

  const uploading = (isUploading: boolean) => {
    setUploading(isUploading);

    if (formProvider) {
      formProvider.form.disable(isUploading);
    }
  };

  const upload = (file: File) => {
    uploading(true);

    const formData = new FormData();

    formData.append(uploadsHandler.uploadsKey(), file);

    setUploadedFile(null);

    const loading = toastLoading(
      trans(moonlightTranslations.uploadingFileDescription),
      trans(moonlightTranslations.uploadingFile),
      2000
    );

    uploadFiles(formData)
      .then((files) => {
        const file = files[0];

        if (!file) {
          return setUploadError(true);
        }

        setUploadedFile(file);

        changeValue(file.id, {
          file,
        });

        loading.success(
          trans(moonlightTranslations.fileUploadedDescription),
          trans(moonlightTranslations.fileUploaded)
        );
      })
      .catch((error) => {
        setUploadError(true);

        loading.error(
          parseError(error),
          trans(moonlightTranslations.uploadingFileFailed)
        );
      })
      .finally(() => {
        uploading(false);
      });
  };

  const reUpload = () => {
    setUploadError(false);
    upload(selectedFile as File);
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const file: File = e.dataTransfer.files[0];

    if (!file) return;

    setSelectedFile(file);
    upload(file);
  };

  const clearSelection = () => {
    setSelectedFile(null);

    changeValue(null);
  };

  const reset = () => {
    clearSelection();
    if (uploadedFile && uploadedFile.id !== initialValue.current.id) {
      deleteUploadedFile(uploadedFile.id);
    }

    setUploadedFile(null);

    setUploadError(false);
  };

  const color = uploadError
    ? "red"
    : buttonProps.color || (selectedFile ? "blue" : "gray");

  const variant = uploadError
    ? "outline"
    : buttonProps.variant || (selectedFile ? "filled" : "default");

  return (
    <>
      <InputWrapper
        description={description}
        hint={hint}
        label={label}
        required={required}
        id={id}
        error={error}
      >
        <HiddenInput name={name} value={uploadedFile?.id} />
        <input
          type="file"
          accept={accept}
          hidden
          ref={fileInputRef}
          onChange={selectFile}
        />
        <Button.Group>
          <Button
            type="button"
            placeholder={placeholder && trans(placeholder)}
            onClick={openFileSelection}
            onChange={selectFile}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            loading={isUploading}
            id={id}
            {...buttonProps}
            color={color}
            variant={variant}
          >
            {selectedFile || uploadedFile ? (
              <Tooltip
                label={
                  uploadedFile ? (
                    <>
                      {uploadedFile.fileName}{" "}
                      <Text component="span" size="sm" color="lime">
                        ( {humanSize(uploadedFile.size)} )
                      </Text>
                    </>
                  ) : (
                    <>
                      {selectedFile?.name}{" "}
                      <Text component="span" size="sm" color="lime">
                        ( {humanSize(selectedFile?.size as number)} )
                      </Text>
                    </>
                  )
                }
              >
                <span>
                  {readMoreChars(
                    (uploadedFile?.fileName || selectedFile?.name) as string,
                    uploadedFile ? 35 : 40
                  )}
                </span>
              </Tooltip>
            ) : (
              buttonLabel
            )}
          </Button>
          {uploadError && (
            <Tooltip label={<span>{trans(moonlightTranslations.retry)}</span>}>
              <Button
                type="button"
                color="red"
                variant="outline"
                onClick={reUpload}
              >
                <IconRefresh />
              </Button>
            </Tooltip>
          )}
          {isUploading && (
            <Tooltip
              label={<span>{trans(moonlightTranslations.uploading)}</span>}
            >
              <Button type="button" color="blue" variant="outline" loading />
            </Tooltip>
          )}
          {uploadedFile && (
            <Tooltip label={<span>{trans(moonlightTranslations.remove)}</span>}>
              <Button
                type="button"
                color="red"
                variant="outline"
                onClick={reset}
              >
                <IconTrash />
              </Button>
            </Tooltip>
          )}
        </Button.Group>
      </InputWrapper>
    </>
  );
}

FileInput.defaultProps = {
  rules: [requiredRule],
};
