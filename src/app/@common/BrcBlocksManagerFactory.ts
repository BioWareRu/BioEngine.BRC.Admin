import { TwitchBlockFormComponent } from '@common/blocks/editor/TwitchBlockFormComponent';
import { TwitchBlock } from '@models/blocks/TwitchBlock';
import { BlocksManager, BlocksManagerFactory, IContentEntity } from 'bioengine.core.api.client';

export class BrcBlocksManagerFactory extends BlocksManagerFactory{
    create(entity: IContentEntity): BlocksManager {
        const manager = super.create(entity);
        manager.registerBlockType('twitchblock', TwitchBlock, TwitchBlockFormComponent);
        return manager;
    }
}
