import { Component } from '@angular/core';
import { ListComponent } from '../../@common/list/ListComponent';
import { Site } from '../../@models/Site';
import { ListTableColumn } from '../../@common/list/ListTableColumn';
import { ListTableColumnType } from '../../@common/list/ListEnums';
import { ListTableColumnAction } from '../../@common/list/ListTableColumnAction';
import { PageContext } from '../../@common/PageComponent';
import { ServicesProvider } from '../../@services/ServicesProvider';
import { Icon } from 'app/@common/shared/icon/Icon';

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './list.component.html',
    providers: [PageContext]
})
export class SitesListComponent extends ListComponent<Site> {
    constructor(context: PageContext, servicesProvider: ServicesProvider) {
        super(context, servicesProvider.SitesService);

        this.setTitle('Список сайтов');
        this.provider.itemsPerPage = 20;
    }

    protected GetColumns(): ListTableColumn<Site>[] {
        return [
            new ListTableColumn<Site>('Id', '#').setSortable(),
            new ListTableColumn<Site>('Title', 'Заголовок')
                .setSortable()
                .setLinkGetter(site => ['/sites', site.Id, 'edit']),
            /*.setDisabled(!this.can(UserRights.AddNews))*/ new ListTableColumn<Site>(
                'DateAdded',
                'Дата',
                ListTableColumnType.TimeAgo
            ).setSortable(),
            new ListTableColumn<Site>('Actions', '')
                .AddAction(
                    new ListTableColumnAction<Site>(
                        'Просмотреть на сайте',
                        new Icon('fa-globe')
                    ).setExternal(site => site.Url)
                )
                .AddAction(
                    new ListTableColumnAction<Site>('Удалить пост', new Icon('fa-trash')).setClick(
                        site => this.deleteItem(site)
                    )
                )
        ];
    }
}
