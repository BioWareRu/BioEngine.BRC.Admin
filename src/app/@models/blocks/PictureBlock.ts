import { Icon } from '@common/shared/icon/Icon';
import { Type } from 'class-transformer';
import { StorageItem } from '../results/StorageItem';
import { AbstractContentBlock, AbstractContentBlockData, ContentBlockItemType } from './abstract-content-block';

export class PictureBlock extends AbstractContentBlock<PictureBlockData> {
    public title = 'Картинка';
    public icon = new Icon('fa-image');
    public type: ContentBlockItemType = ContentBlockItemType.Picture;
    @Type(() => PictureBlockData)
    data: PictureBlockData = new PictureBlockData();

    static isEmpty(block: PictureBlock): boolean {
        return !block.data.picture;
    }
}

export class PictureBlockData extends AbstractContentBlockData {
    public picture: StorageItem | null = null;
    public url: string;
}
