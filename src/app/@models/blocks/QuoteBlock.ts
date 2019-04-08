import { Icon } from '@common/shared/icon/Icon';
import { Type } from 'class-transformer';
import { AbstractContentBlock, AbstractContentBlockData, ContentBlockItemType } from './abstract-content-block';

export class QuoteBlock extends AbstractContentBlock<QuoteBlockData> {
    public title = 'Цитата';
    public icon = new Icon('fa-quote-right');
    public type: ContentBlockItemType = ContentBlockItemType.Quote;
    @Type(() => QuoteBlockData)
    data: QuoteBlockData = new QuoteBlockData();

    static isEmpty(block: QuoteBlock): boolean {
        return !block.data.text || block.data.text === '' || block.data.text === '<p>&nbsp;</p>';
    }
}

export class QuoteBlockData extends AbstractContentBlockData {
    public text = '';
    public author = '';
    public link = '';
}
