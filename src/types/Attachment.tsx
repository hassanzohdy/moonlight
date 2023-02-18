export type Attachment = {
  id: string | number;
  extension: string;
  url: string;
  fileName: string;
  mimeType: string;
  relativePath: string;
  hash: string;
  size: number;
};
