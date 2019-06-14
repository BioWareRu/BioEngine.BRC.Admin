import { Icon } from '@common/shared/icon/Icon';
import { AbstractContentBlock } from '../base/AbstractContentBlock';
import { ContentBlockItemType } from './ContentBlockItemType';
import { GalleryBlockData } from './GalleryBlockData';

export class GalleryBlock extends AbstractContentBlock<GalleryBlockData> {
    public title = 'Галерея';
    public icon = new Icon('fa-images');
    public type: ContentBlockItemType = ContentBlockItemType.Gallery;
    data: GalleryBlockData = new GalleryBlockData();

    static isEmpty(block: GalleryBlock): boolean {
        return !block.data.pictures || block.data.pictures.length === 0;
    }
}


