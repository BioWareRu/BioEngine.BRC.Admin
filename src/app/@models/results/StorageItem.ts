export class StorageItem {
    public FileName: string;
    public FileSize = 0;
    public PublicUri: string;
    public FilePath: string;
    public Type: StorageItemType;
    public PictureInfo: StorageItemPictureInfo;
}

export enum StorageItemType {
    Picture = 1,
    Other = 2
}

export class StorageItemPictureInfo {
    public VerticalResolution: number;
    public HorizontalResolution: number;
}
