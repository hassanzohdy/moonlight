import { ActionIcon, Progress, Text } from "@mantine/core";
import { trans } from "@mongez/localization";
import { IconRotateClockwise2 } from "@tabler/icons";
import { Tooltip } from "../Tooltip";
import { UploadedFile as UploadedFileType } from "./DropzoneInput.types";
import { File } from "./File";

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

export function UploadedFile({
  file,
  reupload,
}: {
  file: UploadedFileType;
  reupload: () => void;
}) {
  const color = getProgressColor(file.progress);

  const rightIcon = file.error ? (
    <Tooltip label={trans("retry")}>
      <ActionIcon color="red" onClick={reupload}>
        <IconRotateClockwise2 />
      </ActionIcon>
    </Tooltip>
  ) : undefined;

  return (
    <div>
      <File
        url={file.url}
        name={file.file.name}
        size={file.file.size}
        rightIcon={rightIcon}
      />
      <Tooltip label={file.progress + "%"}>
        <Progress color={color} value={file.progress} />
      </Tooltip>

      {file.error && (
        <Text color="red" size="sm">
          {file.error}
        </Text>
      )}
    </div>
  );
}
