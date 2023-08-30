import { trans } from "@mongez/localization";
import { UploadingFileValidationOptions, toastError } from "../components";

export const isValidFile = (
  file: File,
  {
    imageWidth,
    minWidth,
    maxWidth,
    imageHeight,
    minHeight,
    maxHeight,
    minSize,
    maxSize,
  }: UploadingFileValidationOptions,
) => {
  return new Promise(resolve => {
    // check for size
    if (minSize || maxSize) {
      // get file size in KB
      const fileSize = file.size / 1024;

      if (minSize && fileSize < minSize) {
        toastError(
          trans("moonlight.imageMinSizeError", { size: minSize }),
          trans("moonlight.uploadError"),
        );

        return resolve(false);
      }

      if (maxSize && fileSize > maxSize) {
        toastError(
          trans("moonlight.imageMaxSizeError", { size: maxSize }),
          trans("moonlight.uploadError"),
        );

        return resolve(false);
      }
    }
    // check for width and height
    if (
      imageWidth ||
      minWidth ||
      maxWidth ||
      imageHeight ||
      minHeight ||
      maxHeight
    ) {
      // check if it is an image first
      if (!file.type.startsWith("image/")) {
        return toastError(
          trans("moonlight.invalidImageFile"),
          trans("moonlight.uploadError"),
        );
      }

      const image = new Image();

      image.src = URL.createObjectURL(file);

      image.onload = () => {
        // check width
        if (imageWidth && image.width !== imageWidth) {
          toastError(
            trans("moonlight.imageWidthError", {
              file: file.name,
              width: imageWidth,
            }),
            trans("moonlight.uploadError"),
          );

          return resolve(false);
        }

        if (minWidth && image.width < minWidth) {
          toastError(
            trans("moonlight.imageMinWidthError", {
              file: file.name,
              width: minWidth,
            }),
            trans("moonlight.uploadError"),
          );

          return resolve(false);
        }

        if (maxWidth && image.width > maxWidth) {
          toastError(
            trans("moonlight.imageMaxWidthError", {
              file: file.name,
              width: maxWidth,
            }),
            trans("moonlight.uploadError"),
          );

          return resolve(false);
        }

        // check height
        if (imageHeight && image.height !== imageHeight) {
          toastError(
            trans("moonlight.imageHeightError", {
              file: file.name,
              height: imageHeight,
            }),
            trans("moonlight.uploadError"),
          );

          return resolve(false);
        }

        if (minHeight && image.height < minHeight) {
          toastError(
            trans("moonlight.imageMinHeightError", {
              file: file.name,
              height: minHeight,
            }),
            trans("moonlight.uploadError"),
          );

          return resolve(false);
        }

        if (maxHeight && image.height > maxHeight) {
          toastError(
            trans("moonlight.imageMaxHeightError", {
              file: file.name,
              height: maxHeight,
            }),
            trans("moonlight.uploadError"),
          );

          return resolve(false);
        }

        resolve(true);
      };
    }

    resolve(true);
  });
};
