import { AbstractContentBlock, Icon } from 'bioengine-angular';
import { TwitchBlockData } from './TwitchBlockData';

export class TwitchBlock extends AbstractContentBlock<TwitchBlockData> {
    public title = 'Twitch';
    public icon = new Icon('fa-twitch', 'fab');
    public type = 'twitch';
    data: TwitchBlockData = new TwitchBlockData();

    public isEmpty(): boolean {
        return !this.data.videoId && !this.data.channelId && !this.data.collectionId;
    }
}


