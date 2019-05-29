import { Component, OnInit } from '@angular/core';
import { Icon } from '@common/shared/icon/Icon';
import { AbstractListComponent } from '@common/list/abstract-list-component';
import { ListTableColumnType } from '@common/list/ListEnums';
import { ListTableColumn } from '@common/list/ListTableColumn';
import { SiteTableColumn } from "@common/list/SiteTableColumn";
import { ListTableColumnAction } from '@common/list/ListTableColumnAction';
import { PageContext } from "@common/PageContext";
import { Menu } from '@models/Menu';
import { ServicesProvider } from '@services/ServicesProvider';

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './list.component.html',
    providers: [PageContext]
})
export class MenuListComponent extends AbstractListComponent<Menu> implements OnInit {
    constructor(private readonly _servicesProvider: ServicesProvider, context: PageContext) {
        super(_servicesProvider.menuService, context);

        this._setTitle('Список меню');
        this.provider.itemsPerPage = 20;
        this.addUrl = '/menu/add';
    }

    ngOnInit(): void {
        this._init();
    }

    protected _getColumns(): Array<ListTableColumn<Menu>> {
        return [
            new ListTableColumn<Menu>('title', 'Название').setSortable().setLinkGetter(menu => {
                return ['/menu', menu.id, 'edit'];
            }),
            /*.setDisabled(!this.can(UserRights.AddNews))*/ new ListTableColumn<Menu>(
                'dateAdded',
                'Дата',
                ListTableColumnType.TimeAgo
            ).setSortable(),
            new SiteTableColumn<Menu>('siteId', 'Сайт'),
            new ListTableColumn<Menu>('actions', '').addAction(
                new ListTableColumnAction<Menu>('Удалить', new Icon('fa-trash')).setClick(menu =>
                    this.deleteItem(menu)
                )
            )
        ];
    }
}
