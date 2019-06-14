import { Component } from '@angular/core';
import { Icon } from '@common/shared/icon/Icon';
import { AbstractListComponent } from '@common/list/AbstractListComponent';
import { ListTableColumnType } from '@common/list/ListEnums';
import { ListTableColumn } from '@common/list/ListTableColumn';
import { ListTableColumnAction } from '@common/list/ListTableColumnAction';
import { PageContext } from '@common/PageContext';
import { Site } from '@models/Site';
import { ServicesProvider } from '@services/ServicesProvider';

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './list.component.html',
    providers: [PageContext]
})
export class SitesListComponent extends AbstractListComponent<Site> {
    constructor(context: PageContext, servicesProvider: ServicesProvider) {
        super(servicesProvider.sitesService, context);

        this._setTitle('Список сайтов');
        this.provider.itemsPerPage = 20;
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
