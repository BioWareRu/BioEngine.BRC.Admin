import { PostBlockData, PostBlock, ContentBlockItemType } from './Post';
import { Type } from 'class-transformer';

export class TextBlock extends PostBlock<TextBlockData> {
    public Type: ContentBlockItemType = ContentBlockItemType.Text;
    @Type(() => TextBlockData)
    Data: TextBlockData = new TextBlockData();
}

export class TextBlockData extends PostBlockData {
    public Text = '';
}
