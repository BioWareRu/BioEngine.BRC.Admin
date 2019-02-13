import { PostBlockData, PostBlock, ContentBlockItemType } from './Post';
import { Type } from 'class-transformer';

export class TwitterBlock extends PostBlock<TwitterBlockData> {
    public Title = 'Twitter';
    public Icon = 'twitter';
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
