import { DropzoneManager } from "./DropzoneManager";
import { UploadingFile } from "./UploadingFile";

export class UploadingFilesQueue {
  /**
   * Uploading files list
   */
  public files: UploadingFile[] = [];

  /**
   * Queue state
   */
  public state: "idle" | "processing" = "idle";

  /**
   * Max uploading files in parallel
   */
  public maxParallelUploads = 1;

  /**
   * Current uploading files
   */
  public currentUploadingFiles = 0;

  /**
   * Constructor
   */
  public constructor(public manager: DropzoneManager) {}

  /**
   * Push files to queue
   */
  public push(...files: UploadingFile[]) {
    this.files.push(...files);

    return this;
  }

  /**
   * Start uploading files
   */
  public async process() {
    //
    if (this.state === "processing") return this;

    if (this.manager.shouldUploadInParallel) {
      this.maxParallelUploads = this.manager.maxParallelUploads;
    }

    this.updateState("processing");

    await this.proceed();
  }

  protected async proceed() {
    // max: 3
    // current: 0
    const maxFilesToBeUploaded =
      this.maxParallelUploads - this.currentUploadingFiles;

    for (let i = 0; i < maxFilesToBeUploaded; i++) {
      this.uploadNextFile();
    }
  }

  /**
   * Check if queue is at max capacity
   */
  protected queueIsAtMaxCapacity() {
    return this.currentUploadingFiles === this.maxParallelUploads;
  }

  /**
   * Upload next file
   */
  protected async uploadNextFile() {
    if (this.queueIsAtMaxCapacity()) return;

    const file = this.files.find(file => file.state === "initial");

    if (!file) return;

    this.currentUploadingFiles++;

    file.updateState("uploading");

    try {
      await file.upload();
    } catch (error: any) {
      file.error = error.message;
      file.updateState("error");
    } finally {
      this.currentUploadingFiles--;
    }

    // if there are no more files to upload, update queue state
    if (!this.files.find(file => file.state === "initial")) {
      return this.updateState("idle");
    }

    setTimeout(() => {
      // check if there are more files to upload
      this.proceed();
    }, 0);
  }

  /**
   * Upload multiple files in parallel
   */
  public async uploadInParallelFiles(maxParallelUploads: number) {
    // get files that are not uploading
    // and limit them to maxParallelUploads
    // if there are no files to upload, return
    // update the queue state to processing
    // then upload them in parallel
    // then update the queue state to idle once all files are uploaded
    const files = this.files
      .filter(file => file.state === "initial")
      .slice(0, maxParallelUploads);

    if (!files.length) return;

    this.updateState("processing");

    // use Promise.settled to wait for all promises to be settled
    const results = await Promise.allSettled(files.map(file => file.upload()));

    for (let i = 0; i < results.length; i++) {
      const result = results[i];

      if (result.status === "rejected") {
        const file = files[i];
        file.state = "error";
        file.error = result.reason.message;
      }
    }

    // if there are no more files to upload, update queue state
    if (!this.files.find(file => file.state === "initial")) {
      return this.updateState("idle");
    }

    // check if there are more files to upload
    await this.uploadInParallelFiles(maxParallelUploads);
  }

  /**
   * Update queue state
   */
  protected updateState(state: "idle" | "processing") {
    setTimeout(() => {
      this.state = state;

      this.manager.triggerQueueStateChange(state);
    }, 0);
  }

  /**
   * Get current uploading files
   */
  public getCurrentUploadingFiles() {
    return this.files.filter(file => file.state !== "uploaded");
  }

  /**
   * Remove file from queue
   */
  public remove(file: UploadingFile) {
    const index = this.files.indexOf(file);

    if (index === -1) return this;

    this.files.splice(index, 1);

    return this;
  }
}
