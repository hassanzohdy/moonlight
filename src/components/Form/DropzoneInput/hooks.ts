import { useAtom } from "@mongez/react-atom";
import { useFormControl } from "@mongez/react-form";
import { useOnce } from "@mongez/react-hooks";
import { useRef, useState } from "react";
import { DropzoneManager } from "./DropzoneManager";
import { UploadingFile } from "./UploadingFile";
import { dropzoneAtom } from "./dropzone-atom";
import { DropzoneInputProps } from "./types";

export function useInitializeDropzoneManager(props: DropzoneInputProps) {
  const dropzoneManagerRef = useRef(new DropzoneManager(props));

  const dropzoneManager = dropzoneManagerRef.current;

  const { formControl } = useFormControl(props, {
    transformValue: value => value,
    collectValue: () => dropzoneManager.filesList.map(file => file.id),
  });

  dropzoneManager.formControl = formControl;

  dropzoneAtom.silentUpdate(dropzoneManager);

  return dropzoneManager;
}

export function useDropzoneManager() {
  return useAtom("dropzone").value as DropzoneManager;
}

export function useUploadingFiles() {
  const dropzoneManager = useDropzoneManager();
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>(
    dropzoneManager.getCurrentUploadingFiles(),
  );

  useOnce(() => {
    dropzoneManager.onUploadChange(() => {
      setUploadingFiles([...dropzoneManager.getCurrentUploadingFiles()]);
    });
  });

  return uploadingFiles;
}

export function useUploadedFiles() {
  const dropzoneManager = useDropzoneManager();
  const [files, setFiles] = useState(dropzoneManager.filesList);

  useOnce(() => {
    dropzoneManager.onFilesListChange(() => {
      setFiles([...dropzoneManager.filesList]);
    });
  });

  return files;
}
