import { Component, OnInit } from '@angular/core';
import { Icon } from '@common/shared/icon/Icon';
import { AbstractListComponent } from '@common/list/abstract-list-component';
import { ListTableColumnType } from '@common/list/ListEnums';
import { ListTableColumn, SitesTableColumn } from '@common/list/ListTableColumn';
import { ListTableColumnAction } from '@common/list/ListTableColumnAction';
import { PageContext } from '@common/abstract-page-component';
import { Page } from '@models/Page';
import { ServicesProvider } from '@services/ServicesProvider';

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './list.component.html',
    providers: [PageContext]
})
export class PagesListComponent extends AbstractListComponent<Page> implements OnInit {
    constructor(private readonly _servicesProvider: ServicesProvider, context: PageContext) {
        super(_servicesProvider.pagesService, context);

        this._setTitle('Список страниц');
        this.provider.itemsPerPage = 20;
        this.addUrl = '/pages/add';
    }

    ngOnInit(): void {
        this._init();
    }

    protected _getColumns(): Array<ListTableColumn<Page>> {
        return [
            new ListTableColumn<Page>('title', 'Заголовок').setSortable().setLinkGetter(page => {
                return ['/pages', page.id, 'edit'];
            }),
            /*.setDisabled(!this.can(UserRights.AddNews))*/ new ListTableColumn<Page>(
                'dateAdded',
                'Дата',
                ListTableColumnType.TimeAgo
            ).setSortable(),
            new SitesTableColumn<Page>('siteIds', 'Сайты'),
            new ListTableColumn<Page>('actions', '')
                .addAction(
                    new ListTableColumnAction<Page>(
                        'Просмотреть на сайте',
                        new Icon('fa-globe')
                    ).setExternal(page => page.url)
                )
                .addAction(
                    new ListTableColumnAction<Page>('Удалить', new Icon('fa-trash')).setClick(
                        page => this.deleteItem(page)
                    )
                )
        ];
    }
}
