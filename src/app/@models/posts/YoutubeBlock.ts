import { PostBlockData, PostBlock, ContentBlockItemType } from './Post';
import { Type } from 'class-transformer';

export class YoutubeBlock extends PostBlock<YoutubeBlockData> {
    public Title = 'Youtube';
    public Icon = 'youtube';
    public Type: ContentBlockItemType = ContentBlockItemType.Youtube;
    @Type(() => YoutubeBlockData)
    Data: YoutubeBlockData = new YoutubeBlockData();
    public isEmpty(): boolean {
        return this.Data.Url === '';
    }
}

export class YoutubeBlockData extends PostBlockData {
    public Url = '';
}
