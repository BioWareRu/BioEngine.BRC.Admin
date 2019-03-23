import { Type } from 'class-transformer';
import { Icon } from 'app/@common/shared/icon/Icon';
import { ContentBlock, ContentBlockItemType, ContentBlockData } from './ContentBlock';

export class CutBlock extends ContentBlock<CutBlockData> {
    public Title = 'Кат';
    public Icon = new Icon('fa-cut');
    public Type: ContentBlockItemType = ContentBlockItemType.Cut;
    @Type(() => CutBlockData)
    Data: CutBlockData = new CutBlockData();

    static IsEmpty(block: CutBlock): boolean {
        return false;
    }
}

export class CutBlockData extends ContentBlockData {
    public ButtonText = 'Читать дальше';
}
