import { Icon } from '@common/shared/icon/Icon';
import { Type } from 'class-transformer';
import { AbstractContentBlock, AbstractContentBlockData, ContentBlockItemType } from './abstract-content-block';

export class CutBlock extends AbstractContentBlock<CutBlockData> {
    public title = 'Кат';
    public icon = new Icon('fa-cut');
    public type: ContentBlockItemType = ContentBlockItemType.Cut;
    @Type(() => CutBlockData)
    data: CutBlockData = new CutBlockData();

    static isEmpty(_block: CutBlock): boolean {
        return false;
    }
}

export class CutBlockData extends AbstractContentBlockData {
    public buttonText = 'Читать дальше';
}
