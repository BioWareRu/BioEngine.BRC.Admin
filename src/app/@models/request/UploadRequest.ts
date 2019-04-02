export class UploadRequest {
  public data: Blob;
  public fileName: string;
  public params: { [id: string]: string };
}
