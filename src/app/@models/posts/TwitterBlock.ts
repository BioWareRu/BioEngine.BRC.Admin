import { PostBlockData, PostBlock, ContentBlockItemType } from './Post';
import { Type } from 'class-transformer';
import { Icon } from 'app/@common/shared/icon/Icon';

export class TwitterBlock extends PostBlock<TwitterBlockData> {
    public Title = 'Twitter';
    public Icon = new Icon('fa-twitter', 'fab');
    public Type: ContentBlockItemType = ContentBlockItemType.Twitter;
    @Type(() => TwitterBlockData)
    Data: TwitterBlockData = new TwitterBlockData();
    public isEmpty(): boolean {
        return this.Data.TwitId > 0;
    }
}

export class TwitterBlockData extends PostBlockData {
    public TwitId: number = null;
}
