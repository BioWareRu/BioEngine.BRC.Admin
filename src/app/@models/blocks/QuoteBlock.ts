import { Icon } from '@common/shared/icon/Icon';
import { AbstractContentBlock } from './abstract-content-block';
import { ContentBlockItemType } from './ContentBlockItemType';
import { QuoteBlockData } from './QuoteBlockData';

export class QuoteBlock extends AbstractContentBlock<QuoteBlockData> {
    public title = 'Цитата';
    public icon = new Icon('fa-quote-right');
    public type: ContentBlockItemType = ContentBlockItemType.Quote;
    data: QuoteBlockData = new QuoteBlockData();

    static isEmpty(block: QuoteBlock): boolean {
        return !block.data.text || block.data.text === '' || block.data.text === '<p>&nbsp;</p>';
    }
}


