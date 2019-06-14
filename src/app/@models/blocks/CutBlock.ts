import { Icon } from '@common/shared/icon/Icon';
import { AbstractContentBlock } from '../base/AbstractContentBlock';
import { ContentBlockItemType } from './ContentBlockItemType';
import { CutBlockData } from './CutBlockData';

export class CutBlock extends AbstractContentBlock<CutBlockData> {
    public title = 'Кат';
    public icon = new Icon('fa-cut');
    public type: ContentBlockItemType = ContentBlockItemType.Cut;
    data: CutBlockData = new CutBlockData();

    static isEmpty(block: CutBlock): boolean {
        return block == null || false;
    }
}


