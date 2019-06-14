import { AbstractEntity } from '@models/base/AbstractEntity';
import { ListTableColumnType } from './ListEnums';
import { ListTableColumn } from './ListTableColumn';

export class TagsTableColumn<T extends AbstractEntity> extends ListTableColumn<T> {
    constructor(key: string, title: string) {
        super(key, title, ListTableColumnType.TagsList);
    }
}
