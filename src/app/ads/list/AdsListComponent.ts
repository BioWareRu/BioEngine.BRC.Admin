import { Component } from '@angular/core';
import { AbstractListComponent } from '@common/list/AbstractListComponent';
import { PageContext } from '@common/PageContext';
import { Ad } from '@models/Ad';
import { AdsService } from '@services/AdsService';
import { Icon, ListTableColumn, ListTableColumnAction, ListTableColumnType, SitesTableColumn } from 'bioengine-angular';

@Component({
    selector: 'ads-list',
    templateUrl: './AdsListComponent.html',
    providers: [PageContext]
})
export class AdsListComponent extends AbstractListComponent<Ad> {
    constructor(context: PageContext, adsService: AdsService) {
        super(adsService, context);

        this._setTitle('Список объявлений');
        this.addUrl = '/ads/add';
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
