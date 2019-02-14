import { PostBlockData, PostBlock, ContentBlockItemType } from './Post';
import { Type } from 'class-transformer';
import { Icon } from 'app/@common/shared/icon/Icon';

export class TextBlock extends PostBlock<TextBlockData> {
    public Title = 'Текст';
    public Icon = new Icon('fa-text');
    public Type: ContentBlockItemType = ContentBlockItemType.Text;
    @Type(() => TextBlockData)
    Data: TextBlockData = new TextBlockData();
    public isEmpty(): boolean {
        return this.Data.Text === '' || this.Data.Text === '<p>&nbsp;</p>';
    }
}

export class TextBlockData extends PostBlockData {
    public Text = '';
}
