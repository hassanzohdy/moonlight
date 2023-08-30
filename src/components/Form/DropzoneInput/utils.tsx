import { Text } from "@mantine/core";
import { FileRejection } from "@mantine/dropzone";
import { trans } from "@mongez/localization";
import { toastError } from "../../toasters";

export function handleRejectedFiles(files: FileRejection[]) {
  files.forEach(file => {
    toastError(
      file.errors.map(error => error.message)[0],
      trans("moonlight.invalidUploadedFile", {
        file: (
          <Text span color="cyan" inline>
            {file.file.name}
          </Text>
        ),
      }),
    );
  });
}
