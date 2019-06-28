import { Component } from '@angular/core';
import { AbstractListComponent } from '@common/list/AbstractListComponent';
import { PageContext } from '@common/PageContext';
import { Icon, ListTableColumn, ListTableColumnAction, ListTableColumnType, Tag, TagsService } from 'bioengine-angular';

@Component({
    selector: 'tags-list',
    templateUrl: './TagsListComponent.html',
    providers: [PageContext]
})
export class TagsListComponent extends AbstractListComponent<Tag> {
    constructor(context: PageContext, tagsService: TagsService) {
        super(tagsService, context);

        this._setTitle('Список тэгов');
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
