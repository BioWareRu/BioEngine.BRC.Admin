import {Component} from '@angular/core';
import {ListComponent} from '../../@common/list/ListComponent';
import {Site} from '../../@models/Site';
import {ActivatedRoute, Router} from '@angular/router';
import {ServicesProvider} from '../../@services/ServicesProvider';
import {ListTableColumn} from '../../@common/list/ListTableColumn';
import {ListTableColumnType} from '../../@common/list/ListEnums';
import {ListTableColumnAction} from '../../@common/list/ListTableColumnAction';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './list.component.html',
})
export class SitesListComponent extends ListComponent<Site> {
  constructor(repository: ServicesProvider, router: Router, route: ActivatedRoute) {
    super(repository.SitesService, router, route);

    this.title = 'Список сайтов';
    this.cardTitle = 'Сайты';
    this.cardIcon = 'assignment';
    this.provider.itemsPerPage = 20;
  }

  protected GetColumns(): ListTableColumn<Site>[] {
    return [
      new ListTableColumn<Site>('Id', '#').setSortable(),
      new ListTableColumn<Site>('Title', 'Заголовок').setSortable()
        .setLinkGetter(site => ['/sites', site.Id, 'edit'])
      /*.setDisabled(!this.can(UserRights.AddNews))*/,
      new ListTableColumn<Site>('DateAdded', 'Дата', ListTableColumnType.TimeAgo).setSortable(),
      new ListTableColumn<Site>('Keywords', 'Ключевики'),
      new ListTableColumn<Site>('Description', 'Описание'),
      new ListTableColumn<Site>('Actions', '')
        .AddAction(
          new ListTableColumnAction<Site>('Просмотреть на сайте', 'globe').setExternal(site => site.Url),
        )
        .AddAction(
          new ListTableColumnAction<Site>('Удалить пост', 'trash').setClick(site => this.deleteItem(site.Id)),
        ),
    ];
  }
}
