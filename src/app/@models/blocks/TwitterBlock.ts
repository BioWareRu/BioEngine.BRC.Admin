import { Type } from 'class-transformer';
import { Icon } from 'app/@common/shared/icon/Icon';
import { ContentBlock, ContentBlockItemType, ContentBlockData } from './ContentBlock';

export class TwitterBlock extends ContentBlock<TwitterBlockData> {
    public Title = 'Twitter';
    public Icon = new Icon('fa-twitter', 'fab');
    public Type: ContentBlockItemType = ContentBlockItemType.Twitter;
    @Type(() => TwitterBlockData)
    Data: TwitterBlockData = new TwitterBlockData();

    static IsEmpty(block: TwitterBlock): boolean {
        return block.Data.TwitId < 1;
    }
}

export class TwitterBlockData extends ContentBlockData {
    public TwitId: number = null;
}
