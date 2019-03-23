import { Type } from 'class-transformer';
import { Icon } from 'app/@common/shared/icon/Icon';
import { ContentBlock, ContentBlockItemType, ContentBlockData } from './ContentBlock';

export class YoutubeBlock extends ContentBlock<YoutubeBlockData> {
    public Title = 'Youtube';
    public Icon = new Icon('fa-youtube', 'fab');
    public Type: ContentBlockItemType = ContentBlockItemType.Youtube;
    @Type(() => YoutubeBlockData)
    Data: YoutubeBlockData = new YoutubeBlockData();

    static IsEmpty(block: YoutubeBlock): boolean {
        return !block.Data.YoutubeId;
    }
}

export class YoutubeBlockData extends ContentBlockData {
    public YoutubeId = '';
    public YoutubeUrl = '';
}
