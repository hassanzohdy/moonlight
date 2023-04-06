import {
  ActionIcon,
  Flex,
  Group,
  Progress,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { trans } from "@mongez/localization";
import { getActiveForm, useFormControl } from "@mongez/react-form";
import { Random } from "@mongez/reinforcements";
import {
  IconList,
  IconPhoto,
  IconTrash,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { SortableItem, SortableList } from "@thaddeusjiang/react-sortable-list";
import { useRef, useState } from "react";
import { FileRejection } from "react-dropzone";
import { moonlightTranslations } from "../../locales";
import { deleteUploadedFile, uploadFile } from "../../services/upload-service";
import { isValidFile } from "../../utils";
import { parseError } from "../../utils/parse-error";
import { toastError, toastLoading } from "../Toast";
import { Tooltip } from "../Tooltip";
import {
  DropzoneInputProps,
  UploadedFile as UploadedFileType,
} from "./DropzoneInput.types";
import { File } from "./File";
import { InputWrapper } from "./InputWrapper";
import { UploadedFile } from "./UploadedFile";

const DragHandler = (props) => (
  <Flex
    style={{
      display: "inline-flex",
    }}
    {...props}
  >
    <IconList
      color="gray"
      style={{
        cursor: "grab",
        marginTop: "0.5rem",
      }}
    />
  </Flex>
);
function initializeUploadedFiles(
  uploadedFiles: UploadedFileType[],
  files: File[]
): UploadedFileType[] {
  return uploadedFiles.concat(
    files.map((file, index) => ({
      file,
      state: "initial",
      progress: 0,
      id: Random.string(),
      index: uploadedFiles.length + index,
      // generate a url for the file
      url: URL.createObjectURL(file),
    }))
  );
}

export function DropzoneInput({
  accept,
  images,
  description,
  hint,
  label,
  required,
  minWidth,
  maxWidth,
  imageWidth,
  minHeight,
  maxHeight,
  imageHeight,
  minSize,
  maxSize,
  ...props
}: DropzoneInputProps) {
  const { value, changeValue, formControl, error, id, otherProps } =
    useFormControl(props, {
      transformValue: (value) => value,
      collectValue: ({ value }) => (value || []).map((file) => file.id),
    });

  const theme = useMantineTheme();

  const [uploadStats, setUploadsStats] = useState([]);

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileType[]>([]);
  const [filesList, setFilesList] = useState<any[]>(() =>
    (value || []).map((attachment) => ({
      ...attachment,
      id: attachment.id || Random.string(),
    }))
  );

  const updateFile = async (file: UploadedFileType, index: number) => {
    setUploadedFiles((uploadedFiles) => {
      uploadedFiles[index] = file;

      const updatedFiles = [...uploadedFiles];

      setTimeout(async () => {
        const stats = await calculateStats(updatedFiles);

        const loading = loaderRef.current;

        const progressPercentage = stats.total.progressPercentage;

        if (progressPercentage === 100 && !stats.total.uploading) {
          if (stats.total.errors) {
            if (stats.total.errors < stats.total.files) {
              loading.warning(
                trans(moonlightTranslations.partialUploadSuccess),
                <>
                  <div>
                    {trans(
                      moonlightTranslations.partialUploadSuccessDescription,
                      {
                        count: stats.total.files,
                        success: stats.total.uploaded,
                      }
                    )}
                  </div>
                  <Progress value={100} color={theme.colors.yellow[5]} />
                </>
              );
            } else {
              loading.error(
                trans(moonlightTranslations.uploadingFilesFailed),
                <>
                  <div>
                    {trans(
                      moonlightTranslations.uploadingFilesFailedDescription,
                      {
                        count: stats.total.files,
                      }
                    )}
                  </div>
                  <Progress value={100} color={theme.colors.red[5]} />
                </>
              );
            }
          } else {
            loading.success(
              trans(moonlightTranslations.filesUploaded),
              <>
                <div>
                  {trans(moonlightTranslations.filesUploadedSuccessfully, {
                    count: stats.total.uploaded,
                  })}
                </div>
                <Progress value={100} color={theme.colors.green[5]} />
              </>
            );
          }

          loaderRef.current = null;
        } else {
          loading.update(
            trans(moonlightTranslations.uploadingFiles, {
              count: stats.total.files,
              current: stats.total.uploaded,
            }),
            <>
              <div>
                {trans(moonlightTranslations.uploadingFilesDescription, {
                  count: stats.total.files,
                  current: stats.total.uploaded,
                })}
              </div>
              <Tooltip label={stats.total.progressPercentage + "%"}>
                <Progress value={stats.total.progressPercentage} />
              </Tooltip>
            </>
          );
        }
      }, 0);

      return updatedFiles;
    });
  };

  const calculateStats = async (uploadedFiles: UploadedFileType[]) => {
    uploadedFiles = await Promise.all(
      uploadedFiles.filter(async (file) => {
        return await isValidFile(file.file, {
          minHeight,
          maxHeight,
          minWidth,
          maxWidth,
          minSize,
          maxSize,
          imageHeight,
          imageWidth,
        });
      })
    );

    // total progress percentage = average of all files that's its progress is not either 100 or 0 progress percentage
    let totalFiles = 0;
    const totalPercentage = uploadedFiles.reduce((total, file) => {
      totalFiles++;
      total += file.progress;

      return total;
    }, 0);

    const progressPercentage = Math.round(totalPercentage / totalFiles);

    const stats = {
      uploadingFiles: uploadedFiles.filter(
        (file) => !["uploaded", "initial"].includes(file.state)
      ),
      total: {
        progressPercentage,
        files: uploadedFiles.length,
        uploading: uploadedFiles.filter((file) => file.state === "uploading")
          .length,
        uploaded: uploadedFiles.filter((file) => file.state === "uploaded")
          .length,
        errors: uploadedFiles.filter((file) => file.state === "error").length,
      },
    };

    setUploadsStats(stats);

    setTimeout(() => {
      getActiveForm()?.disable(stats.total.uploading > 0);
    }, 50);

    return stats;
  };

  const loaderRef = useRef<any>(null);

  const upload = async (file: UploadedFileType, index: number) => {
    if (file.state !== "initial") return;

    if (
      (await isValidFile(file.file, {
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        minSize,
        maxSize,
        imageWidth,
        imageHeight,
      })) === false
    )
      return;

    file.state = "uploading";

    updateFile(file, index);

    const completedUpload = () => {
      updateFile(file, index);
    };

    uploadFile(file.file, (progress) => {
      file.progress = progress;

      updateFile(file, index);
    })
      .then((attachment) => {
        file.state = "uploaded";
        setFilesList((filesList) => {
          const attachments = [...filesList, attachment];

          changeValue(attachments);

          return attachments;
        });
      })
      .catch((error) => {
        file.state = "error";
        file.error = parseError(error);
      })
      .finally(() => {
        completedUpload();
      });
  };

  const initializeUploading = async (files: File[]) => {
    const uploadingFiles = initializeUploadedFiles(uploadedFiles, files);

    const stats = await calculateStats(uploadingFiles);

    if (!loaderRef.current) {
      const loading = toastLoading(
        trans(moonlightTranslations.uploadingFiles, {
          count: stats.total.files,
          current: 0,
        }),
        <Progress value={0} />,
        2000
      );

      loaderRef.current = loading;
    }

    uploadingFiles.forEach(upload);

    setUploadedFiles(uploadingFiles);
  };

  const reuploadFile = async (file: UploadedFileType) => {
    file.state = "initial";
    file.error = null;
    file.progress = 0;

    const fileIndex = uploadedFiles.indexOf(file);

    const stats = await calculateStats(uploadedFiles);

    if (!loaderRef.current) {
      const loading = toastLoading(
        trans(moonlightTranslations.uploadingFiles, {
          count: stats.total.files,
          current: 0,
        }),
        <Progress value={0} />,
        2000
      );

      loaderRef.current = loading;
    }

    upload(file, fileIndex);
  };

  const startUploading = (files: File[]) => {
    initializeUploading(files);
  };

  const removeFile = (fileId: string) => {
    const fileIndex = filesList.findIndex((file) => file.id === fileId);

    if (fileIndex === -1) return;

    // check first if the file hash was given to the input

    const initialValue = formControl.initialValue || [];

    if (initialValue.find((file) => file.id === fileId)) {
      // just remove it from the array and don't send a request to the server
      // why? becaus user may close the form without saving

      filesList.splice(fileIndex, 1);

      const newFiles = [...filesList];
      changeValue(
        newFiles.map((file) => file.id),
        {
          attachments: newFiles,
        }
      );

      setFilesList(newFiles);

      return;
    }

    const loading = toastLoading(
      trans(moonlightTranslations.fileIsBeingForDeletion),
      trans(moonlightTranslations.deletingFile)
    );

    deleteUploadedFile(fileId)
      .then(() => {
        filesList.splice(fileIndex, 1);

        const newFiles = [...filesList];
        loading.success(
          trans(moonlightTranslations.fileDeletedSuccessfully),
          trans(moonlightTranslations.fileDeleted)
        );
        changeValue(
          newFiles.map((file) => file.id),
          {
            attachments: newFiles,
          }
        );

        setFilesList(newFiles);
      })
      .catch((error) => {
        loading.error(
          trans(moonlightTranslations.deleteFileFailed),
          parseError(error)
        );
      });
  };

  const onFilesRejected = (files: FileRejection[]) => {
    files.forEach((file) => {
      toastError(
        file.errors.map((error) => error.message)[0],
        trans(moonlightTranslations.invalidUploadedFile, {
          file: (
            <Text span color="cyan" inline>
              {file.file.name}
            </Text>
          ),
        })
      );
    });
  };

  return (
    <InputWrapper
      label={label}
      description={description}
      hint={hint}
      error={error}
      id={id}
      required={required}
    >
      <Dropzone
        onDrop={startUploading}
        onReject={onFilesRejected}
        accept={accept || (images ? IMAGE_MIME_TYPE : undefined)}
        {...otherProps}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 220, pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              size={50}
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size={50}
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={50} color={theme.colors.gray[5]} stroke={1.5} />
          </Dropzone.Idle>

          <Text align="center">
            <Text
              size="lg"
              inline
              color={theme.colors.gray[6]}
              style={{
                marginTop: "-3rem",
              }}
            >
              Drag images here or click to select files
            </Text>
            <Text
              color="dimmed"
              style={{
                lineHeight: 1.5,
                fontSize: "0.75rem",
              }}
              inline
              mt={8}
            >
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </Text>
        </Group>
      </Dropzone>
      {uploadStats.uploadingFiles.map((file) => {
        return (
          <UploadedFile
            reupload={() => reuploadFile(file)}
            key={file.id}
            file={file}
          />
        );
      })}

      <SortableList items={filesList as any[]} setItems={setFilesList as any}>
        {({ items }: any) =>
          items.map((file) => {
            return (
              <SortableItem
                DragHandler={DragHandler}
                key={file.id}
                id={file.id}
              >
                <Flex
                  style={{
                    display: "inline-flex",
                    width: "calc(100% - 50px)",
                  }}
                  justify="flex-start"
                >
                  <span
                    style={{
                      flexGrow: 1,
                    }}
                  >
                    <File
                      url={file.url}
                      key={file.id}
                      size={file.size}
                      name={file.fileName}
                      rightIcon={
                        <Tooltip label={trans(moonlightTranslations.remove)}>
                          <ActionIcon onClick={() => removeFile(file.id)}>
                            <IconTrash />
                          </ActionIcon>
                        </Tooltip>
                      }
                    />
                  </span>
                </Flex>
              </SortableItem>
            );
          })
        }
      </SortableList>
    </InputWrapper>
  );
}
