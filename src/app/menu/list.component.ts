import {Component, OnInit} from '@angular/core';
import {ListComponent} from '../@common/list/ListComponent';
import {ListTableColumn, SitesTableColumn} from '../@common/list/ListTableColumn';
import {ListTableColumnType} from '../@common/list/ListEnums';
import {ListTableColumnAction} from '../@common/list/ListTableColumnAction';
import {PageContext} from '../@common/PageComponent';
import {ServicesProvider} from '../@services/ServicesProvider';
import {Site} from '../@models/Site';
import {Menu} from '../@models/Menu';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './list.component.html',
  providers: [
    PageContext
  ]
})
export class MenuListComponent extends ListComponent<Menu> implements OnInit {
  private sites: Site[];

  constructor(context: PageContext, private servicesProvider: ServicesProvider) {
    super(context, servicesProvider.MenuService);

    this.StateService.setTitle('Список меню');
    this.provider.itemsPerPage = 20;
      this.addUrl = '/menu/add';
  }

  ngOnInit(): void {
    this.servicesProvider.SitesService.getAll(1, 100, 'id').subscribe(res => {
      this.sites = res.Data;
      this.Init();
    });
  }

  protected GetColumns(): ListTableColumn<Menu>[] {
    return [
      new ListTableColumn<Menu>('Id', '#').setSortable(),
      new ListTableColumn<Menu>('Title', 'Название').setSortable()
        .setLinkGetter(menu => {
            return ['/menu', menu.Id, 'edit'];
        })
      /*.setDisabled(!this.can(UserRights.AddNews))*/,
      new ListTableColumn<Menu>('DateAdded', 'Дата', ListTableColumnType.TimeAgo).setSortable(),
      new SitesTableColumn<Menu>('SiteIds', 'Сайты', this.sites),
      new ListTableColumn<Menu>('Actions', '')
        .AddAction(
            new ListTableColumnAction<Menu>('Удалить', 'delete').setClick(menu => this.deleteItem(menu.Id)),
        ),
    ];
  }
}
