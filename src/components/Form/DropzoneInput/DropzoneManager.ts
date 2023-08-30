import { FileRejection, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import events from "@mongez/events";
import { FormControl } from "@mongez/react-form";
import { Random, merge } from "@mongez/reinforcements";
import { isValidFile } from "../../../utils";
import { UploadingFile } from "./UploadingFile";
import { UploadingFilesQueue } from "./UploadingFileQueue";
import { DropzoneInputProps, Fileable } from "./types";
import { handleRejectedFiles } from "./utils";

export class DropzoneManager {
  /**
   * Uploading files list
   */
  public uploadingFiles: UploadingFile[] = [];

  /**
   * Set uploading files list state update
   */
  setUploadingFiles!: (files: UploadingFile[]) => void;

  /**
   * Files List
   * Already uploaded
   */
  public filesList: Fileable[] = [];

  /**
   * Form control
   */
  public formControl!: FormControl;

  /**
   * Dropzone input props
   */
  public props: DropzoneInputProps;

  /**
   * Uploading files queue
   */
  public uploadingFilesQueue: UploadingFilesQueue;

  /**
   * Dropzone manager id
   */
  public id = Random.string(64);

  /**
   * Event name
   */
  public eventName = `dropzone.${this.id}`;

  /**
   * Default props
   */
  public defaultProps: Partial<DropzoneInputProps> = {
    chunked: false,
    maxChunkSize: 512 * 1024, // 512KB
    inParallel: false,
    maxParallelUploads: 3,
    maxParallelChunks: 3,
  };

  /**
   * Constructor
   */
  public constructor(props: DropzoneInputProps) {
    this.props = merge(this.defaultProps, props || {});

    this.uploadingFilesQueue = new UploadingFilesQueue(this);

    if (props?.defaultValue) {
      this.filesList = props.defaultValue;
    }
  }

  /**
   * Add to files list
   */
  public addToFilesList(file: Fileable) {
    this.filesList.push(file);

    this.triggerFilesListChange();
  }

  /**
   * Set files list
   */
  public setFilesList(files: Fileable[]) {
    this.filesList = files;

    this.triggerFilesListChange();
  }

  /**
   * Get input wrapper props
   */
  public get inputWrapperProps() {
    return {
      label: this.props.label,
      description: this.props.description,
      hint: this.props.hint,
      required: this.props.required,
      error: this.formControl.error,
      id: this.formControl.id,
    };
  }

  /**
   * Get accepted files types
   */
  public get acceptedFiles() {
    // mime type

    if (this.props.images) return IMAGE_MIME_TYPE;

    if (this.props.videos)
      return ["video/mp4", "video/ogg", "video/webm", "video/mkv", "video/avi"];

    return this.props.accept;
  }

  /**
   * Called when files are rejected
   */
  public onReject(files: FileRejection[]) {
    return handleRejectedFiles(files);
  }

  /**
   * Start uploading files
   */
  public async uploadFiles(files: File[]) {
    const uploadingFiles = await this.validateUploadingFiles(files);

    this.uploadingFilesQueue.push(...uploadingFiles);

    await this.upload();
  }

  /**
   * Remove uploading file from the queue
   */
  public removeUploadingFile(file: UploadingFile) {
    this.uploadingFilesQueue.remove(file);

    this.triggerUploadingFilesChange(file);
  }

  /**
   * Start uploading
   */
  public async upload() {
    await this.uploadingFilesQueue.process();
  }

  /**
   * Validate uploading files
   */
  protected async validateUploadingFiles(files: File[]) {
    const newUploadingFiles: UploadingFile[] = [];

    for (const file of files) {
      if (
        !(await isValidFile(file, {
          imageWidth: this.props.imageWidth,
          minWidth: this.props.minWidth,
          maxWidth: this.props.maxWidth,
          imageHeight: this.props.imageHeight,
          minHeight: this.props.minHeight,
          maxHeight: this.props.maxHeight,
          minSize: this.props.minSize,
          maxSize: this.props.maxSize,
        }))
      ) {
        continue;
      }

      const uploadingFile = new UploadingFile(file, this);

      uploadingFile.onStateChange(file => {
        this.triggerUploadingFilesChange(file);
      });

      newUploadingFiles.push(uploadingFile);
    }

    return newUploadingFiles;
  }

  /**
   * Determine whether the files will be uploaded in chunks
   */
  public get shouldChunkFiles() {
    return this.props.chunked;
  }

  /**
   * Whether to upload files in parallel or not
   */
  public get shouldUploadInParallel() {
    return this.props.inParallel;
  }

  /**
   * Get max uploaded files in parallel
   */
  public get maxParallelUploads() {
    return this.props.maxParallelUploads as number;
  }

  /**
   * Get max chunk size
   */
  public get maxChunkSize() {
    return this.props.maxChunkSize as number;
  }

  /**
   * Get max parallel chunks
   */
  public get maxParallelChunks() {
    return this.props.maxParallelChunks as number;
  }

  /**
   * Get currently uploading files from the queue
   */
  public getCurrentUploadingFiles() {
    return this.uploadingFilesQueue.getCurrentUploadingFiles();
  }

  /**
   * Listen to uploading files change
   */
  public onUploadingFilesChange(
    callback: (state: "idle" | "processing", dropzoneManager: this) => void,
  ) {
    return events.subscribe(this.eventName + ".uploading", callback);
  }

  /**
   * Called when file state is changed
   */
  protected triggerUploadingFilesChange(file: UploadingFile) {
    events.trigger(this.eventName + ".upload", file, this);
  }

  /**
   * Listen when any file upload state is changed
   */
  public onUploadChange(
    callback: (file: UploadingFile, dropzoneManager: this) => void,
  ) {
    return events.subscribe(this.eventName + ".upload", callback);
  }

  /**
   * Trigger the queue state change
   */
  public triggerQueueStateChange(state: "idle" | "processing") {
    events.trigger(this.eventName + ".queue", state, this);
  }

  /**
   * Listen to queue state change
   */
  public onQueueStateChange(
    callback: (state: "idle" | "processing", dropzoneManager: this) => void,
  ) {
    return events.subscribe(this.eventName + ".queue", callback);
  }

  /**
   * Trigger files list change
   */
  public triggerFilesListChange() {
    events.trigger(this.eventName + ".files", this.filesList, this);
  }

  /**
   * Listen to files list change
   */
  public onFilesListChange(
    callback: (files: Fileable[], dropzoneManager: this) => void,
  ) {
    return events.subscribe(this.eventName + ".files", callback);
  }

  /**
   * Remove file from files list
   */
  public removeFile(file: Fileable) {
    this.filesList = this.filesList.filter(f => f.id !== file.id);

    this.triggerFilesListChange();
  }
}
