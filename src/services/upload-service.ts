import Endpoint from "@mongez/http";
import { Fileable } from "../components";
import { getMoonlightConfig } from "../config";

export function uploadFiles(
  data: FormData,
  progressPercentageCallback?: (percentage: number) => void,
  cancelToken?: AbortSignal,
): Promise<Fileable[]> {
  const endpoint = getMoonlightConfig("endpoint") as Endpoint;
  const uploadsRoute = getMoonlightConfig("uploads.route", "/uploads");
  return new Promise((resolve, reject) => {
    endpoint
      .post(uploadsRoute, data, {
        signal: cancelToken,
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

export function uploadFile(
  file: File,
  progressPercentageCallback?: (percentage: number) => void,
  signal?: AbortSignal,
): Promise<Fileable> {
  const formData = new FormData();

  formData.append(uploadsHandler.uploadsKey(), file);

  return new Promise((resolve, reject) => {
    uploadFiles(formData, progressPercentageCallback, signal)
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
