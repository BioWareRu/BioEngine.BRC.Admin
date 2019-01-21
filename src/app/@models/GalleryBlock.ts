import { PostBlockData, PostBlock, ContentBlockItemType } from './Post';
import { Type } from 'class-transformer';
import { StorageItem } from './results/StorageItem';

export class GalleryBlock extends PostBlock<GalleryBlockData> {
    public Type: ContentBlockItemType = ContentBlockItemType.Gallery;
    @Type(() => GalleryBlockData)
    Data: GalleryBlockData = new GalleryBlockData();
    public isEmpty(): boolean {
        return this.Data.Pictures.length === 0;
    }
}

export class GalleryBlockData extends PostBlockData {
    public Pictures: StorageItem[] = [];
}
