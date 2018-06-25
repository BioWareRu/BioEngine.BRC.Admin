export class UploadRequest {
  public Data: Blob;
  public FileName: string;
  public Params: { [id: string]: string };
}
