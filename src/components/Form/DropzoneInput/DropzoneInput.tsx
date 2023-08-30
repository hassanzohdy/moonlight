import { Group, Text, useMantineTheme } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { trans } from "@mongez/localization";
import { AtomProvider } from "@mongez/react-atom";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { InputWrapper } from "..";
import { UploadedFilesList } from "./UploadedFilesList";
import { UploadingFilesList } from "./UploadingFilesList";
import { useInitializeDropzoneManager } from "./hooks";
import { DropzoneInputProps } from "./types";

export function DropzoneInput(props: DropzoneInputProps) {
  // get the dropzone manager
  const dropzoneManager = useInitializeDropzoneManager(props);
  const theme = useMantineTheme();

  return (
    <>
      <AtomProvider>
        <InputWrapper {...dropzoneManager.inputWrapperProps}>
          <Dropzone
            onDrop={dropzoneManager.uploadFiles.bind(dropzoneManager)}
            onReject={dropzoneManager.onReject.bind(dropzoneManager)}
            accept={dropzoneManager.acceptedFiles as any}>
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: 220, pointerEvents: "none" }}>
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
                <IconPhoto
                  size={50}
                  color={theme.colors.gray[5]}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <Text align="center">
                <Text
                  size="lg"
                  inline
                  color={theme.colors.gray[6]}
                  style={{
                    marginTop: "-3rem",
                  }}>
                  {trans("moonlight.dragFiles")}
                </Text>
                <Text
                  color="dimmed"
                  style={{
                    lineHeight: 1.5,
                    fontSize: "0.75rem",
                  }}
                  inline
                  mt={8}>
                  {trans("moonlight.dropzoneDescription")}
                </Text>
              </Text>
            </Group>
          </Dropzone>

          <UploadingFilesList />
          <UploadedFilesList />
        </InputWrapper>
      </AtomProvider>
    </>
  );
}
