import { PostBlockData, PostBlock, ContentBlockItemType } from './Post';
import { Type } from 'class-transformer';

export class CutBlock extends PostBlock<CutBlockData> {
    public Title = 'Кат';
    public Icon = 'more_horiz';
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
