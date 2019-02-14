import { PostBlockData, PostBlock, ContentBlockItemType } from './Post';
import { Type } from 'class-transformer';
import { Icon } from 'app/@common/shared/icon/Icon';

export class CutBlock extends PostBlock<CutBlockData> {
    public Title = 'Кат';
    public Icon = new Icon('fa-cut');
    public Type: ContentBlockItemType = ContentBlockItemType.Cut;
    @Type(() => CutBlockData)
    Data: CutBlockData = new CutBlockData();
    public isEmpty(): boolean {
        return false;
    }
}

export class CutBlockData extends PostBlockData {
    public Title = '';
}
