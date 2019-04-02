export class StorageItem {
    public id: number;
    public fileName: string;
    public fileSize = 0;
    public publicUri: string;
    public filePath: string;
    public type: StorageItemType;
    public pictureInfo: StorageItemPictureInfo;
}

export enum StorageItemType {
    Picture = 1,
    Other = 2
}

export class StorageItemPictureInfo {
    public verticalResolution: number;
    public horizontalResolution: number;
}
