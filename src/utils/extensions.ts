export function isImageExtension(extension: string) {
  return ["jpg", "jpeg", "png", "gif", "svg", "webp", "bmp", "ico"].includes(
    extension.toLocaleLowerCase(),
  );
}

export const audiExtensions = ["mp3", "wav", "ogg"];
export const videoExtensions = [
  "mp4",
  "mkv",
  "avi",
  "wmv",
  "mov",
  "webm",
  "qt",
];

export const imagesExtensions = [];

export const acceptImagesOnly = "image/*";
export const acceptPDFOnly = "application/pdf";

export const acceptAudioExtensions = audiExtensions.map(
  extension => "audio/" + extension,
);

export const acceptVideoExtensions = videoExtensions.map(
  extension => "video/" + extension,
);

export const acceptMediaExtensions = [
  ...acceptAudioExtensions,
  ...acceptVideoExtensions,
];

export const mimeTypes = [
  "image/apng",
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
];

export function isImage(file: string) {
  const extension = getFileExtension(file);

  return isImageExtension(extension);
}

export function isAudio(file: string) {
  const extension = getFileExtension(file);

  return audiExtensions.includes(extension.toLocaleLowerCase());
}

export function isPDF(file: string) {
  return file.endsWith(".pdf");
}

export function isVideo(file: string) {
  const extension = getFileExtension(file);

  return videoExtensions.includes(extension.toLocaleLowerCase());
}

export function getFileExtension(file: string) {
  return file.split(".").pop()?.toLocaleLowerCase() || "";
}
