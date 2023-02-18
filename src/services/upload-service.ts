import { getMoonlightConfig } from "../config";

export function uploadFiles(
  data: any,
  progressPercentageCallback?: (percentage: number) => void,
) {
  const endpoint = getMoonlightConfig("endpoint");
  const uploadsRoute = getMoonlightConfig("uploads.route", "/uploads");
  return endpoint.post(uploadsRoute, data, {
    onUploadProgress(progressEvent) {
      if (!progressEvent.total) return;

      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );

      progressPercentageCallback?.(percentCompleted);
    },
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
): Promise<any> {
  const formData = new FormData();

  formData.append(uploadsHandler.uploadsKey(), file);

  return new Promise((resolve, reject) => {
    uploadFiles(formData, progressPercentageCallback)
      .then(response => {
        resolve(uploadsHandler.resolveResponse(response));
      })
      .catch(reject);
  });
}

export const uploadsHandler = {
  resolveResponse: getMoonlightConfig(
    "uploads.responseCallback",
    response => response.data.uploads,
  ),
  uploadsKey: () => getMoonlightConfig("uploads.key", "uploads[]"),
};
