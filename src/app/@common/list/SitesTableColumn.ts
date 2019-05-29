import { AbstractModel } from '@models/base/abstract-model';
import { ListTableColumnType } from './ListEnums';
import { ListTableColumn } from './ListTableColumn';
export class SitesTableColumn<T = AbstractModel> extends ListTableColumn<T> {
    constructor(key: string, title: string) {
        super(key, title, ListTableColumnType.SitesList);
    }
}
