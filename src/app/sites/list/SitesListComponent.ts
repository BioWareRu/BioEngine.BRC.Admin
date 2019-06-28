import { Component } from '@angular/core';
import { AbstractListComponent } from '@common/list/AbstractListComponent';
import { PageContext } from '@common/PageContext';
import { Icon, ListTableColumn, ListTableColumnAction, ListTableColumnType, Site, SitesService } from 'bioengine.core.api.client';

@Component({
    selector: 'sites-list',
    templateUrl: './SitesListComponent.html',
    providers: [PageContext]
})
export class SitesListComponent extends AbstractListComponent<Site> {
    constructor(context: PageContext, sitesService: SitesService) {
        super(sitesService, context);

        this._setTitle('Список сайтов');
    }

    protected _getColumns(): Array<ListTableColumn<Site>> {
        return [
            new ListTableColumn<Site>('title', 'Заголовок')
                .setSortable()
                .setLinkGetter(site => ['/sites', site.id, 'edit']),
            /*.setDisabled(!this.can(UserRights.AddNews))*/ new ListTableColumn<Site>(
                'dateAdded',
                'Дата',
                ListTableColumnType.TimeAgo
            ).setSortable(),
            new ListTableColumn<Site>('actions', '')
                .addActions(
                    site => [
                        new ListTableColumnAction<Site>(
                            'Просмотреть на сайте',
                            new Icon('fa-globe')
                        ).setExternal(site.url)
                    ])
                .addAction(
                    new ListTableColumnAction<Site>('Удалить пост', new Icon('fa-trash')).setClick(
                        site => this.deleteItem(site)
                    )
                )
        ];
    }
}
