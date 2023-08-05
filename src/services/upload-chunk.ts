/* eslint-disable no-async-promise-executor */
import { sha1 } from "@mongez/encryption";
import CryptoJS, { SHA256 } from "crypto-js";
import { toastError, toastSuccess } from "../components";
import { getMoonlightConfig } from "../config";
import { parseError } from "../utils";
import { uploadsHandler } from "./upload-service";

export const AUTO = Symbol("AUTO");

export function calculateChunkHash(chunk: ArrayBuffer) {
  // Convert the ArrayBuffer to a WordArray
  const arrayBufferView = new Uint8Array(chunk);
  const array = Array.from(arrayBufferView);

  const wordArray = CryptoJS.lib.WordArray.create(array);
  return SHA256(wordArray).toString();
}

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
        time: new Date().getTime(),
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
  formData.append("chunkHash", calculateChunkHash(chunk));

  const endpoint = getMoonlightConfig("endpoint");

  return endpoint.post("/uploads/chunks?c=" + chunkNumber, formData);
}
export async function uploadFileChunked({
  file,
  progressPercentageCallback,
  maxChunkSize = 500 * 1024,
  maxParallelChunks = 10,
}: {
  maxChunkSize?: number;
  maxParallelChunks?: number;
  file: File;
  progressPercentageCallback?: (percentage: number) => void;
}) {
  return new Promise(async resolve => {
    const totalChunks = Math.ceil(file.size / maxChunkSize);

    let errorToaster;
    let toastId;

    // Create an array to track the status of each chunk
    const uploadedChunks: boolean[] = new Array(totalChunks).fill(false);

    async function uploadChunk(chunkNumber: number) {
      if (errorToaster && errorToaster !== chunkNumber) {
        errorToaster = undefined;
        toastId.close();
        toastId = undefined;
        toastSuccess("Continuing upload...", "Upload resumed");
      }

      try {
        // Use Promise.all to upload multiple chunks in parallel
        const promises: any[] = [];
        for (let i = 0; i < maxParallelChunks; i++) {
          const chunkIndex = chunkNumber + i;
          if (chunkIndex < totalChunks && !uploadedChunks[chunkIndex]) {
            const start = chunkIndex * maxChunkSize;
            const end = Math.min(start + maxChunkSize, file.size);
            const currentChunkSize = end - start;
            const chunkSize = maxChunkSize;

            const chunkContent = await getChunkContent(file, start, end);

            const uploadPromise = uploadChunkContent({
              file,
              chunkNumber: chunkIndex,
              totalChunks,
              chunkSize,
              currentChunkSize,
              start,
              end,
              chunk: chunkContent,
            });

            // Once the chunk is uploaded, mark it as completed
            uploadPromise.then(() => {
              uploadedChunks[chunkIndex] = true;
            });

            promises.push(uploadPromise);
          }
        }

        await Promise.all(promises);

        if (progressPercentageCallback) {
          const uploadProgress = Math.round(
            (uploadedChunks.filter(Boolean).length * 100) / totalChunks,
          );
          progressPercentageCallback(uploadProgress);
        }

        // Check if all chunks are uploaded
        if (uploadedChunks.every(Boolean)) {
          progressPercentageCallback?.(100);

          // Fetch the last chunk response
          const lastChunkResponse = await promises[promises.length - 1];

          const response = uploadsHandler.resolveResponse(lastChunkResponse);

          resolve(response);
          return;
        } else {
          // Continue with the next chunk
          const nextChunk = uploadedChunks.indexOf(false, chunkNumber + 1);
          if (nextChunk !== -1) {
            uploadChunk(nextChunk);
          }
        }
      } catch (error) {
        // Retry the chunk upload
        if (!errorToaster) {
          toastId = toastError(parseError(error), "Retrying upload...", {
            autoClose: false,
          });
          errorToaster = chunkNumber;
        }
        // Retry with the same chunk number
        uploadChunk(chunkNumber);
      }
    }

    // Start uploading the first chunk
    uploadChunk(0);
  });
}

async function getChunkContent(
  file: File,
  start: number,
  end: number,
): Promise<any> {
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
