import { Component } from '@angular/core';
import { Icon } from '@common/shared/icon/Icon';
import { AbstractListComponent } from '@common/list/AbstractListComponent';
import { ListTableColumnType } from '@common/list/ListEnums';
import { ListTableColumn } from '@common/list/ListTableColumn';
import { ListTableColumnAction } from '@common/list/ListTableColumnAction';
import { PageContext } from '@common/PageContext';
import { Tag } from '@models/Tag';
import { ServicesProvider } from '@services/ServicesProvider';

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './list.component.html',
    providers: [PageContext]
})
export class TagsListComponent extends AbstractListComponent<Tag> {
    constructor(context: PageContext, servicesProvider: ServicesProvider) {
        super(servicesProvider.tagsService, context);

        this._setTitle('Список тэгов');
        this.provider.itemsPerPage = 20;
    }

    protected _getColumns(): Array<ListTableColumn<Tag>> {
        return [
            new ListTableColumn<Tag>('title', 'Заголовок').setSortable(),
            new ListTableColumn<Tag>(
                'dateAdded',
                'Дата',
                ListTableColumnType.TimeAgo
            ).setSortable(),
            new ListTableColumn<Tag>('actions', '').addAction(
                new ListTableColumnAction<Tag>('Удалить тэг', new Icon('fa-trash')).setClick(tag =>
                    this.deleteItem(tag)
                )
            )
        ];
    }
}
