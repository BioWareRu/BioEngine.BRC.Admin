import { Icon } from '@common/shared/icon/Icon';
import { Type } from 'class-transformer';
import { StorageItem } from '../results/StorageItem';
import { AbstractContentBlock, AbstractContentBlockData, ContentBlockItemType } from './abstract-content-block';

export class GalleryBlock extends AbstractContentBlock<GalleryBlockData> {
    public title = 'Галерея';
    public icon = new Icon('fa-images');
    public type: ContentBlockItemType = ContentBlockItemType.Gallery;
    @Type(() => GalleryBlockData)
    data: GalleryBlockData = new GalleryBlockData();

    static isEmpty(block: GalleryBlock): boolean {
        return !block.data.pictures || block.data.pictures.length === 0;
    }
}

export class GalleryBlockData extends AbstractContentBlockData {
    public pictures: Array<StorageItem> = [];
}
