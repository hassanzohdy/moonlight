import events from "@mongez/events";
import { Random } from "@mongez/reinforcements";
import React from "react";
import { uploadFile } from "../../../services";
import { uploadFileChunked } from "../../../services/upload-chunk";
import { parseError } from "../../../utils";
import { DropzoneManager } from "./DropzoneManager";
import { UploadingFileState } from "./types";

// Events
export class UploadingFile {
  /**
   * File id
   */
  public id = Random.string(64);

  /**
   * Uploading file state
   */
  public state: UploadingFileState = "initial";

  /**
   * Upload progress
   */
  public uploadProgress = 0;

  /**
   * Error message if uploading failed
   */
  public error: React.ReactNode = null;

  /**
   * File url
   */
  public url = "";

  /**
   * File index in the queue
   */
  public fileIndex = 0;

  /**
   * Abort controls list
   */
  public abortControls: AbortController[] = [];

  /**
   * Constructor
   */
  public constructor(public file: File, public manager: DropzoneManager) {
    this.url = URL.createObjectURL(file);
  }

  /**
   * Start uploading file
   */
  public async upload() {
    try {
      if (this.manager.shouldChunkFiles) {
        const result = await uploadFileChunked({
          file: this.file,
          maxChunkSize: this.manager.maxChunkSize,
          maxParallelChunks: this.manager.maxParallelChunks,
          progressPercentageCallback: this.updateFileProgress.bind(this),
          abortControllers: this.abortControls,
        });

        this.manager.addToFilesList(result);
      } else {
        const abortControl = new AbortController();
        const result = await uploadFile(
          this.file,
          this.updateFileProgress.bind(this),
          abortControl.signal,
        );

        this.abortControls.push(abortControl);

        this.manager.addToFilesList(result);
      }

      this.updateState("uploaded");

      this.abortControls = [];

      return this;
    } catch (error) {
      this.error = parseError(error);

      this.updateState("error");
    }
  }

  /**
   * Cancel uploading file
   */
  public async cancel() {
    if (this.manager.shouldChunkFiles) {
      this.abortControls.forEach(abortControl => abortControl.abort());

      this.abortControls = [];
    } else {
      const abortController = this.abortControls.pop();

      if (!abortController) return;

      abortController.abort();
    }

    this.updateState("initial");

    this.updateFileProgress(0);

    this.manager.removeUploadingFile(this);
  }

  /**
   * Update file state
   */
  public updateState(state: UploadingFileState) {
    this.state = state;
    setTimeout(() => {
      // Trigger state update event
      events.trigger(`dropzone.file.${this.id}.state`, this);
    }, 0);
  }

  /**
   * Update file progress
   */
  public updateFileProgress(progress: number) {
    this.uploadProgress = progress;

    // Trigger progress update event
    events.trigger(`dropzone.file.${this.id}.progress`, progress);
  }

  /**
   * Listen to file progress
   */
  public onProgress(callback: (progress: number) => void) {
    return events.subscribe(`dropzone.file.${this.id}.progress`, callback);
  }

  /**
   * On state change
   */
  public onStateChange(callback: (file: UploadingFile) => void) {
    return events.subscribe(`dropzone.file.${this.id}.state`, callback);
  }

  /**
   * Re upload file
   */
  public async reupload() {
    // reset file state
    // reset file progress
    // reset file error
    this.uploadProgress = 0;
    this.error = null;
    this.state = "initial";

    // call the upload from drop zone manager to call the queue
    await this.manager.upload();
  }
}
