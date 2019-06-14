import { Icon } from '@common/shared/icon/Icon';
import { AbstractContentBlock } from '../base/AbstractContentBlock';
import { ContentBlockItemType } from './ContentBlockItemType';
import { TwitterBlockData } from './TwitterBlockData';

export class TwitterBlock extends AbstractContentBlock<TwitterBlockData> {
    public title = 'Twitter';
    public icon = new Icon('fa-twitter', 'fab');
    public type: ContentBlockItemType = ContentBlockItemType.Twitter;
    data: TwitterBlockData = new TwitterBlockData();

    static isEmpty(block: TwitterBlock): boolean {
        return !block.data.tweetId;
    }
}


