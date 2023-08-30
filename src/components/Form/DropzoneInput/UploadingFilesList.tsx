import { UploadedFile } from "./UploadedFile";
import { useUploadingFiles } from "./hooks";

export function UploadingFilesList() {
  const uploadingFiles = useUploadingFiles();

  return (
    <>
      {uploadingFiles.map(file => (
        <UploadedFile file={file} key={file.id} />
      ))}
    </>
  );
}
