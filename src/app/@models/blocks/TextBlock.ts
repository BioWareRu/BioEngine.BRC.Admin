import { Type } from 'class-transformer';
import { Icon } from 'app/@common/shared/icon/Icon';
import { ContentBlock, ContentBlockItemType, ContentBlockData } from './ContentBlock';

export class TextBlock extends ContentBlock<TextBlockData> {
    public Title = 'Текст';
    public Icon = new Icon('fa-pen');
    public Type: ContentBlockItemType = ContentBlockItemType.Text;
    @Type(() => TextBlockData)
    Data: TextBlockData = new TextBlockData();

    static IsEmpty(block: TextBlock): boolean {
        return !block.Data.Text || block.Data.Text === '' || block.Data.Text === '<p>&nbsp;</p>';
    }
}

export class TextBlockData extends ContentBlockData {
    public Text = '';
}
