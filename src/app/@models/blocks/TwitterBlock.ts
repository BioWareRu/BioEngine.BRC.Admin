import { Icon } from '@common/shared/icon/Icon';
import { Type } from 'class-transformer';
import { AbstractContentBlock } from './abstract-content-block';
import { ContentBlockItemType } from "./ContentBlockItemType";
import { TwitterBlockData } from './TwitterBlockData';

export class TwitterBlock extends AbstractContentBlock<TwitterBlockData> {
    public title = 'Twitter';
    public icon = new Icon('fa-twitter', 'fab');
    public type: ContentBlockItemType = ContentBlockItemType.Twitter;
    @Type(() => TwitterBlockData)
    data: TwitterBlockData = new TwitterBlockData();

    static isEmpty(block: TwitterBlock): boolean {
        return !block.data.tweetId;
    }
}


