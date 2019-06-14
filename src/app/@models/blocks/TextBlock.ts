import { Icon } from '@common/shared/icon/Icon';
import { AbstractContentBlock } from '../base/AbstractContentBlock';
import { ContentBlockItemType } from './ContentBlockItemType';
import { TextBlockData } from './TextBlockData';

export class TextBlock extends AbstractContentBlock<TextBlockData> {
    public title = 'Текст';
    public icon = new Icon('fa-pen');
    public type: ContentBlockItemType = ContentBlockItemType.Text;
    data: TextBlockData = new TextBlockData();

    static isEmpty(block: TextBlock): boolean {
        return !block.data.text || block.data.text === '' || block.data.text === '<p>&nbsp;</p>';
    }
}


