import { TwitchBlockFormComponent } from '@common/blocks/editor/TwitchBlockFormComponent';
import { TwitchBlock } from '@models/blocks/TwitchBlock';
import { BlocksManager, BlocksManagerFactory } from 'bioengine-angular';

export class BrcBlocksManagerFactory extends BlocksManagerFactory{
    create(): BlocksManager {
        const manager = super.create();
        manager.registerBlockType('twitchblock', TwitchBlock, TwitchBlockFormComponent);
        return manager;
    }
}
