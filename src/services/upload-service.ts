import { sha1 } from "@mongez/encryption";
import { Fileable } from "../components/Form/DropzoneInput.types";
import { getMoonlightConfig } from "../config";

export function uploadFiles(
  data: FormData,
  progressPercentageCallback?: (percentage: number) => void,
): Promise<Fileable[]> {
  const endpoint = getMoonlightConfig("endpoint");
  const uploadsRoute = getMoonlightConfig("uploads.route", "/uploads");
  return new Promise((resolve, reject) => {
    endpoint
      .post(uploadsRoute, data, {
        onUploadProgress(progressEvent) {
          if (!progressEvent.total || !progressPercentageCallback) return;

          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );

          progressPercentageCallback(percentCompleted);
        },
      })
      .then(response => {
        resolve(uploadsHandler.resolveResponse(response));
      })
      .catch(reject);
  });
}

export function deleteUploadedFile(fileId: string | number) {
  const endpoint = getMoonlightConfig("endpoint");
  const deleteRoute = getMoonlightConfig("uploads.deleteRoute", "/uploads");
  return endpoint.delete(`${deleteRoute}/${fileId}`);
}

export const AUTO = Symbol("AUTO");

async function uploadChunkContent({
  file,
  chunkNumber,
  totalChunks,
  chunkSize,
  currentChunkSize,
  start,
  end,
  chunk,
}) {
  const formData = new FormData();

  // chunk is sent as ArrayBuffer
  // we need to convert it to Blob
  const blob = new Blob([chunk], { type: file.type });

  if (!file.id) {
    file.id = sha1(
      JSON.stringify({
        name: file.name,
        size: file.size,
        type: file.type,
      }),
    );
  }

  formData.append("fileId", file.id);
  formData.append("chunk", blob);
  formData.append("totalChunks", totalChunks.toString());
  formData.append("chunkNumber", chunkNumber.toString());
  formData.append("chunkSize", chunkSize.toString());
  formData.append("currentChunkSize", currentChunkSize.toString());
  formData.append("start", start.toString());
  formData.append("end", end.toString());
  formData.append("fileSize", file.size.toString());
  formData.append("fileName", file.name);
  formData.append("fileType", file.type);

  const endpoint = getMoonlightConfig("endpoint");

  return endpoint.post("/uploads/chunks", formData);
}

export async function uploadFileChunked({
  file,
  progressPercentageCallback,
  // max chunk size in bytes
  // defaults to 500kb
  maxChunkSize = 500 * 1024,
}: {
  maxChunkSize?: number;
  file: File;
  progressPercentageCallback?: (percentage: number) => void;
}) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const totalChunks = Math.ceil(file.size / maxChunkSize);
    // now we want to upload each chunk
    for (let i = 0; i < totalChunks; i++) {
      const start = i * maxChunkSize;
      const end = Math.min(start + maxChunkSize, file.size);
      const currentChunkSize = end - start;
      const chunkNumber = i; // zero-based
      const chunkSize = maxChunkSize;
      // now get the chunk content using file reader
      const chunkContent = await getChunkContent(file, start, end);

      // now upload the chunk
      const response = await uploadChunkContent({
        file,
        chunkNumber,
        totalChunks,
        chunkSize,
        currentChunkSize,
        start,
        end,
        chunk: chunkContent,
      });

      if (progressPercentageCallback) {
        const uploadProgress = Math.round(
          ((chunkNumber + 1) * 100) / totalChunks,
        );
        progressPercentageCallback(uploadProgress);
      }

      // if it is the last chunk, resolve the promise
      if (chunkNumber === totalChunks - 1) {
        progressPercentageCallback?.(100);
        const file = uploadsHandler.resolveResponse(response);

        resolve(file);
      }
    }
  });
}

async function getChunkContent(file: File, start: number, end: number) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      resolve(e.target?.result);
    };

    reader.onerror = function (e) {
      reject(e);
    };
    reader.readAsArrayBuffer(file.slice(start, end));
  });
}

export function uploadFile(
  file: File,
  progressPercentageCallback?: (percentage: number) => void,
): Promise<Fileable> {
  const formData = new FormData();

  formData.append(uploadsHandler.uploadsKey(), file);

  return new Promise((resolve, reject) => {
    uploadFiles(formData, progressPercentageCallback)
      .then(files => {
        resolve(files[0]);
      })
      .catch(reject);
  });
}

export const uploadsHandler = {
  resolveResponse: response => {
    return getMoonlightConfig(
      "uploads.resolveResponse",
      response => response.data.uploads || response.data.upload,
    )(response);
  },
  uploadsKey: () => getMoonlightConfig("uploads.key", "uploads[]"),
};
