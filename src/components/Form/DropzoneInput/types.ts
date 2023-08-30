import { DropzoneProps } from "@mantine/dropzone";
import { FormControlProps } from "@mongez/react-form";

export type UploadingFileValidationOptions = {
  /**
   * Exact image width
   */
  imageWidth?: number;
  /**
   * Exact image height
   */
  imageHeight?: number;
  /**
   * Minimum image height
   */
  minWidth?: number;
  /**
   * Maximum image width
   */
  maxWidth?: number;
  /**
   * Minimum image height
   */
  minHeight?: number;
  /**
   * Maximum image height
   */
  maxHeight?: number;
  /**
   * Minimum file size in KB
   */
  minSize?: number;
  /**
   * Maximum file size in KB
   */
  maxSize?: number;
};

export type DropzoneInputProps = FormControlProps &
  Partial<DropzoneProps> &
  UploadingFileValidationOptions & {
    /**
     * If true, the dropzone will accept images only
     */
    images?: boolean;
    /**
     * If true, the dropzone will accept videos only
     */
    videos?: boolean;
    /**
     * Description to show above the dropzone and below the label
     */
    description?: React.ReactNode;
    /**
     * Hint to show in the help icon
     */
    hint?: React.ReactNode;
    /**
     * Whether to chunk files or not
     * This is recommended for large files
     *
     * @default false
     */
    chunked?: boolean;
    /**
     * If chunked is enabled, this will be the max allowed chunk size in bytes
     *
     * @default 512 * 1024 = 512KB
     */
    maxChunkSize?: number;
    /**
     * Whether to upload files in parallel or not
     *
     * @default true
     */
    inParallel?: boolean;
    /**
     * Max allowed files to be in the dropzone
     */
    maxFiles?: number;
    /**
     * Max parallel chunks to upload
     *
     * @default 5
     */
    maxParallelUploads?: number;
  };

/**
 * Uploading file state
 */
export type UploadingFileState = "initial" | "uploading" | "uploaded" | "error";

export type UploadedFile = {
  /**
   * File object
   */
  file: File;
  /**
   * Uploading file state
   */
  state: "initial" | "uploading" | "uploaded" | "error";
  /**
   * Current uploading progress
   */
  progress: number;
  /**
   * Error message if uploading failed
   */
  error?: React.ReactNode;
  /**
   * File index in the dropzone
   */
  index?: number;
  /**
   * File ID
   */
  id: string | number;
  /**
   * File URL
   */
  url?: string;
  /**
   * Reupload file
   */
  reupload: () => void;
};

export type Fileable = {
  /**
   * File ID
   */
  id: string | number;
  /**
   * File URL
   */
  url: string;
  /**
   * File name
   */
  name: string;
  /**
   * File size
   */
  size?: number;
  /**
   * File type
   */
  type?: string;
};
