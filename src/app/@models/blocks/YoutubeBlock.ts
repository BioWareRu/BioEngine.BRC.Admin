import { Icon } from '@common/shared/icon/Icon';
import { Type } from 'class-transformer';
import { AbstractContentBlock, AbstractContentBlockData, ContentBlockItemType } from './abstract-content-block';

export class YoutubeBlock extends AbstractContentBlock<YoutubeBlockData> {
    public title = 'Youtube';
    public icon = new Icon('fa-youtube', 'fab');
    public type: ContentBlockItemType = ContentBlockItemType.Youtube;
    @Type(() => YoutubeBlockData)
    data: YoutubeBlockData = new YoutubeBlockData();

    static isEmpty(block: YoutubeBlock): boolean {
        return !block.data.youtubeId;
    }
}

export class YoutubeBlockData extends AbstractContentBlockData {
    public youtubeId = '';
    public youtubeUrl = '';
}
