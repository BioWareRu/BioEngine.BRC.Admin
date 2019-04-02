import { Icon } from '@common/shared/icon/Icon';
import { Type } from 'class-transformer';
import { AbstractContentBlock, AbstractContentBlockData, ContentBlockItemType } from './abstract-content-block';

export class TextBlock extends AbstractContentBlock<TextBlockData> {
    public title = 'Текст';
    public icon = new Icon('fa-pen');
    public type: ContentBlockItemType = ContentBlockItemType.Text;
    @Type(() => TextBlockData)
    data: TextBlockData = new TextBlockData();

    static isEmpty(block: TextBlock): boolean {
        return !block.data.text || block.data.text === '' || block.data.text === '<p>&nbsp;</p>';
    }
}

export class TextBlockData extends AbstractContentBlockData {
    public text = '';
}
