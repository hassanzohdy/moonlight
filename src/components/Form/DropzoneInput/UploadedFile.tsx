import { ActionIcon, Flex, Progress, Text } from "@mantine/core";
import { trans } from "@mongez/localization";
import { useEvent } from "@mongez/react-hooks";
import { IconRotateClockwise2, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";
import { Tooltip } from "../../Tooltip";
import { File } from "./File";
import { UploadingFile } from "./UploadingFile";

const getProgressColor = (progressValue: number) => {
  let color: string;

  if (progressValue < 15) {
    color = "yellow";
  } else if (progressValue < 25) {
    color = "orange.5";
  } else if (progressValue < 50) {
    color = "indigo";
  } else if (progressValue < 75) {
    color = "violet.5";
  } else if (progressValue < 100) {
    color = "cyan";
  } else {
    color = "green";
  }

  return color;
};

export function UploadedFile({ file }: { file: UploadingFile }) {
  const [progress, setProgress] = useState(file.uploadProgress);
  const color = getProgressColor(progress);

  const [error, setError] = useState<React.ReactNode>(null);

  useEvent(() => file.onProgress(setProgress));
  useEvent(() => file.onStateChange(file => setError(file.error)));

  let rightIcon: React.ReactNode = null;

  if (error) {
    rightIcon = (
      <Tooltip label={trans("retry")}>
        <ActionIcon color="red" onClick={file.reupload.bind(file)}>
          <IconRotateClockwise2 />
        </ActionIcon>
      </Tooltip>
    );
  } else if (progress < 100) {
    rightIcon = (
      <Flex mt="xl" gap="sm">
        <Text fw={700} size="sm" color={color}>
          {progress}%
        </Text>

        <Tooltip label={trans("cancel")}>
          <ActionIcon color="red" onClick={file.cancel.bind(file)}>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    );
  }

  return (
    <div>
      <File
        url={file.url}
        name={file.file.name}
        size={file.file.size}
        rightIcon={rightIcon}
      />
      {!error && (
        <Progress
          my="xs"
          sections={[
            {
              value: progress,
              tooltip: progress + "%",
              color,
            },
          ]}
        />
      )}
      {error && (
        <Text color="red" size="sm">
          {error}
        </Text>
      )}
    </div>
  );
}
