import {Component} from '@angular/core';
import {ListComponent} from '../../@common/list/ListComponent';
import {ListTableColumn, SitesTableColumn} from '../../@common/list/ListTableColumn';
import {ListTableColumnType} from '../../@common/list/ListEnums';
import {ListTableColumnAction} from '../../@common/list/ListTableColumnAction';
import {PageContext} from '../../@common/PageComponent';
import {ServicesProvider} from '../../@services/ServicesProvider';
import {Page} from '../../@models/Page';
import {Site} from '../../@models/Site';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './list.component.html',
  providers: [
    PageContext
  ]
})
export class PagesListComponent extends ListComponent<Page> {
  private sites: Site[];

  constructor(context: PageContext, private servicesProvider: ServicesProvider) {
    super(context, servicesProvider.PagesService);

    this.StateService.setTitle('Список страниц');
    this.provider.itemsPerPage = 20;
    this.addUrl = '/pages/pages/add';
  }

  ngOnInit() {
    this.servicesProvider.SitesService.getAll(1, 100, 'id').subscribe(res => {
      this.sites = res.Data;
      this.Init();
    });
  }

  protected GetColumns(): ListTableColumn<Page>[] {
    return [
      new ListTableColumn<Page>('Id', '#').setSortable(),
      new ListTableColumn<Page>('Title', 'Заголовок').setSortable()
        .setLinkGetter(page => {
          return ['/pages/pages', page.Id, 'edit'];
        })
      /*.setDisabled(!this.can(UserRights.AddNews))*/,
      new ListTableColumn<Page>('DateAdded', 'Дата', ListTableColumnType.TimeAgo).setSortable(),
      new SitesTableColumn<Page>('SiteIds', 'Сайты', this.sites),
      new ListTableColumn<Page>('Actions', '')
        .AddAction(
          new ListTableColumnAction<Page>('Просмотреть на сайте', 'globe').setExternal(secion => secion.Url),
        )
        .AddAction(
          new ListTableColumnAction<Page>('Удалить', 'trash').setClick(Developer => this.deleteItem(Developer.Id)),
        ),
    ];
  }
}
