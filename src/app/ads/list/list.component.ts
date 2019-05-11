import { Component, OnInit } from '@angular/core';
import { Icon } from '@common/shared/icon/Icon';
import { AbstractListComponent } from '@common/list/abstract-list-component';
import { ListTableColumnType } from '@common/list/ListEnums';
import { ListTableColumn, SitesTableColumn } from '@common/list/ListTableColumn';
import { ListTableColumnAction } from '@common/list/ListTableColumnAction';
import { PageContext } from '@common/abstract-page-component';
import { Ad } from '@models/Ad';
import { ServicesProvider } from '@services/ServicesProvider';

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './list.component.html',
    providers: [PageContext]
})
export class AdsListComponent extends AbstractListComponent<Ad> implements OnInit {
    constructor(private readonly _servicesProvider: ServicesProvider, context: PageContext) {
        super(_servicesProvider.adsService, context);

        this._setTitle('Список объявлений');
        this.provider.itemsPerPage = 20;
        this.addUrl = '/ads/add';
    }

    ngOnInit(): void {
        this._init();
    }

    protected _getColumns(): Array<ListTableColumn<Ad>> {
        return [
            new ListTableColumn<Ad>('title', 'Заголовок').setSortable().setLinkGetter(ad => {
                return ['/ads', ad.id, 'edit'];
            }),
            /*.setDisabled(!this.can(UserRights.AddNews))*/ new ListTableColumn<Ad>(
                'dateAdded',
                'Дата',
                ListTableColumnType.TimeAgo
            ).setSortable(),
            new SitesTableColumn<Ad>('siteIds', 'Сайты'),
            new ListTableColumn<Ad>('actions', '')
                .addAction(
                    new ListTableColumnAction<Ad>('Удалить', new Icon('fa-trash')).setClick(
                        ad => this.deleteItem(ad)
                    )
                )
        ];
    }
}
