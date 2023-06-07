import {
  ActionIcon,
  Avatar,
  AvatarProps,
  Image as BaseImage,
  Button,
  Popover,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { trans } from "@mongez/localization";
import {
  FormControlProps,
  requiredRule,
  useForm,
  useFormControl,
} from "@mongez/react-form";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React, { useRef, useState } from "react";
import { deleteUploadedFile, uploadFile } from "../../services/upload-service";
import {
  UploadingFileValidationOptions,
  isValidFile,
  parseError,
} from "../../utils";
import { acceptImagesOnly } from "../../utils/extensions";
import { Tooltip } from "../Tooltip";
import { toastError, toastLoading } from "../toasters";
import { InputWrapper } from "./InputWrapper";

export type ImageInputProps = AvatarProps &
  FormControlProps &
  UploadingFileValidationOptions & {
    size?: AvatarProps;
    circle?: boolean;
    clearable?: boolean;
    description?: React.ReactNode;
    hint?: React.ReactNode;
  };

export function ImageInput({
  clearable,
  circle,
  description,
  hint,
  label,
  required,
  withPlaceholder,
  minWidth,
  maxWidth,
  imageWidth,
  minHeight,
  maxHeight,
  imageHeight,
  minSize,
  maxSize,
  ...props
}: ImageInputProps) {
  const { id, value, changeValue, error, otherProps } = useFormControl(
    {
      ...props,
      required,
    },
    {
      transformValue: value => value,
      collectValue: ({ value }) => value?.id,
      isCollectable: ({ value }) => value?.id !== undefined,
    },
  );

  const [isUploading, setUploading] = useState(false);
  const [imageOptionsOpened, toggleImageOptionsPopup] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const [uploadedFile, setUploadedFile] = useState<any | null>(null);

  const form = useForm();

  const fileInputRef = useRef<any>();

  const openImageSelector = () => {
    if (!required) {
      if (clearable && value) {
        toggleImageOptionsPopup(true);
        return;
      }
    }

    selectImage();
  };

  const selectImage = () => {
    fileInputRef.current && fileInputRef.current.click();

    toggleImageOptionsPopup(false);
  };

  const uploading = (isUploading: boolean) => {
    setUploading(isUploading);

    if (form) {
      form.disable(isUploading);
    }
  };

  const startUploading = (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    upload(file);

    // clear the file select for allowing uploading same file again
    e.target.value = "";
  };

  const upload = async (file: File) => {
    if (
      !(await isValidFile(file, {
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        minSize,
        maxSize,
        imageWidth,
        imageHeight,
      }))
    )
      return;

    uploading(true);

    const loader = toastLoading(trans("moonlight.uploading"));

    uploadFile(file)
      .then(file => {
        setUploadedFile(file);
        loader.close();

        changeValue(file);
      })
      .catch(error => {
        loader.error(parseError(error));
        setUploadError(true);
      })
      .finally(() => {
        uploading(false);
      });
  };

  const clearImage = () => {
    if (uploadedFile && value && uploadedFile.id === value.id) {
      deleteUploadedFile(uploadedFile.id);
      setUploadedFile(null);
      toggleImageOptionsPopup(false);
    }

    changeValue(null);
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
    const file: File | undefined = e.dataTransfer.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toastError(trans("invalidImageFile"));
    }

    upload(file);
  };

  const ImageComponent = circle ? Avatar : BaseImage;

  const theme = useMantineTheme();

  return (
    <>
      <input
        style={{ width: "100%", display: "none" }}
        type="file"
        accept={acceptImagesOnly}
        className="hidden"
        ref={fileInputRef}
        onChange={startUploading}
      />

      <InputWrapper
        label={label}
        loading={isUploading}
        required={required}
        error={uploadError || error}
        hint={hint || <span>{trans("clickOrDarg")}</span>}
        description={description}
        id={id}>
        <Popover
          opened={imageOptionsOpened}
          onChange={toggleImageOptionsPopup}
          position="top"
          withArrow
          shadow="md">
          <Popover.Target>
            <UnstyledButton id={id} type="button" onClick={openImageSelector}>
              <ImageComponent
                style={{
                  cursor: "pointer",
                  display: "block",
                  boxShadow: theme.shadows.sm,
                }}
                withPlaceholder={!circle ? withPlaceholder : undefined}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                radius={circle ? 1000 : undefined}
                {...otherProps}
                src={isUploading ? undefined : value?.url || undefined}
              />
            </UnstyledButton>
          </Popover.Target>
          <Popover.Dropdown>
            <Button.Group>
              {!required && value && (
                <Tooltip label={<span>{trans("remove")}</span>}>
                  <ActionIcon color="red" onClick={clearImage}>
                    <IconTrash />
                  </ActionIcon>
                </Tooltip>
              )}
              {!required && value && (
                <Tooltip label={<span>{trans("edit")}</span>}>
                  <ActionIcon color="blue" onClick={selectImage}>
                    <IconEdit />
                  </ActionIcon>
                </Tooltip>
              )}
            </Button.Group>
          </Popover.Dropdown>
        </Popover>
      </InputWrapper>
    </>
  );
}

ImageInput.defaultProps = {
  rules: [requiredRule],
  size: "lg",
  clearable: true,
  withPlaceholder: true,
};
