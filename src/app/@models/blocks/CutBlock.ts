import { Icon } from '@common/shared/icon/Icon';
import { AbstractContentBlock } from './abstract-content-block';
import { ContentBlockItemType } from './ContentBlockItemType';
import { CutBlockData } from './CutBlockData';

export class CutBlock extends AbstractContentBlock<CutBlockData> {
    public title = 'Кат';
    public icon = new Icon('fa-cut');
    public type: ContentBlockItemType = ContentBlockItemType.Cut;
    data: CutBlockData = new CutBlockData();

    static isEmpty(_block: CutBlock): boolean {
        return false;
    }
}


