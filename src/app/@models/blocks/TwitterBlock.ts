import { Icon } from '@common/shared/icon/Icon';
import { Type } from 'class-transformer';
import { AbstractContentBlock, AbstractContentBlockData, ContentBlockItemType } from './abstract-content-block';

export class TwitterBlock extends AbstractContentBlock<TwitterBlockData> {
    public title = 'Twitter';
    public icon = new Icon('fa-twitter', 'fab');
    public type: ContentBlockItemType = ContentBlockItemType.Twitter;
    @Type(() => TwitterBlockData)
    data: TwitterBlockData = new TwitterBlockData();

    static isEmpty(block: TwitterBlock): boolean {
        return !block.data.twitId || block.data.twitId < 1;
    }
}

export class TwitterBlockData extends AbstractContentBlockData {
    public twitId: number | null = null;
}
