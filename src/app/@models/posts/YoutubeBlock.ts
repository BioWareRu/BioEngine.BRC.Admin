import { PostBlockData, PostBlock, ContentBlockItemType } from './Post';
import { Type } from 'class-transformer';
import { Icon } from 'app/@common/shared/icon/Icon';

export class YoutubeBlock extends PostBlock<YoutubeBlockData> {
    public Title = 'Youtube';
    public Icon = new Icon('fa-youtube', 'fab');
    public Type: ContentBlockItemType = ContentBlockItemType.Youtube;
    @Type(() => YoutubeBlockData)
    Data: YoutubeBlockData = new YoutubeBlockData();
}

export class YoutubeBlockData extends PostBlockData {
    public YoutubeId = '';
    public YoutubeUrl = '';
}
