import { Icon } from '@common/shared/icon/Icon';
import { Type } from 'class-transformer';
import { AbstractContentBlock } from './abstract-content-block';
import { ContentBlockItemType } from './ContentBlockItemType';
import { TwitchBlockData } from './TwitchBlockData';

export class TwitchBlock extends AbstractContentBlock<TwitchBlockData> {
    public title = 'Twitch';
    public icon = new Icon('fa-twitch', 'fab');
    public type: ContentBlockItemType = ContentBlockItemType.Twitch;
    @Type(() => TwitchBlockData)
    data: TwitchBlockData = new TwitchBlockData();

    static isEmpty(block: TwitchBlock): boolean {
        return !block.data.videoId && !block.data.channelId && !block.data.collectionId;
    }
}


