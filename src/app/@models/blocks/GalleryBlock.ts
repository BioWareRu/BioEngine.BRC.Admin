import { Type } from 'class-transformer';
import { StorageItem } from '../results/StorageItem';
import { Icon } from 'app/@common/shared/icon/Icon';
import { ContentBlockData, ContentBlock, ContentBlockItemType } from './ContentBlock';

export class GalleryBlock extends ContentBlock<GalleryBlockData> {
    public Title = 'Галерея';
    public Icon = new Icon('fa-images');
    public Type: ContentBlockItemType = ContentBlockItemType.Gallery;
    @Type(() => GalleryBlockData)
    Data: GalleryBlockData = new GalleryBlockData();

    static IsEmpty(block: GalleryBlock): boolean {
        return !block.Data.Pictures || block.Data.Pictures.length === 0;
    }
}

export class GalleryBlockData extends ContentBlockData {
    public Pictures: StorageItem[] = [];
}
