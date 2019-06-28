import { Component, OnInit } from '@angular/core';
import { AbstractListComponent } from '@common/list/AbstractListComponent';
import { PageContext } from '@common/PageContext';
import { Icon, ListTableColumn, ListTableColumnAction, ListTableColumnType, Menu, MenuService, SiteTableColumn } from 'bioengine.core.api.client';

@Component({
    selector: 'menu-list',
    templateUrl: './MenuListComponent.html',
    providers: [PageContext]
})
export class MenuListComponent extends AbstractListComponent<Menu> implements OnInit {
    constructor(context: PageContext, menuService: MenuService) {
        super(menuService, context);

        this._setTitle('Список меню');
        this.addUrl = '/menu/add';
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
