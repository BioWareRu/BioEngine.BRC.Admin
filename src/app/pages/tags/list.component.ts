import {Component} from '@angular/core';
import {ListComponent} from '../../@common/list/ListComponent';
import {ListTableColumn} from '../../@common/list/ListTableColumn';
import {ListTableColumnType} from '../../@common/list/ListEnums';
import {ListTableColumnAction} from '../../@common/list/ListTableColumnAction';
import {PageContext} from '../../@common/PageComponent';
import {ServicesProvider} from '../../@services/ServicesProvider';
import {Tag} from '../../@models/Tag';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './list.component.html',
  providers: [
    PageContext
  ]
})
export class TagsListComponent extends ListComponent<Tag> {
  constructor(context: PageContext, servicesProvider: ServicesProvider) {
    super(context, servicesProvider.TagsService);

    this.StateService.setTitle('Список тэгов');
    this.provider.itemsPerPage = 20;
  }

  protected GetColumns(): ListTableColumn<Tag>[] {
    return [
      new ListTableColumn<Tag>('Id', '#').setSortable(),
      new ListTableColumn<Tag>('Name', 'Заголовок').setSortable()
        .setLinkGetter(tag => ['/pages/tags', tag.Id, 'edit'])
      /*.setDisabled(!this.can(UserRights.AddNews))*/,
      new ListTableColumn<Tag>('DateAdded', 'Дата', ListTableColumnType.TimeAgo).setSortable(),
      new ListTableColumn<Tag>('Actions', '')
        .AddAction(
          new ListTableColumnAction<Tag>('Удалить тэг', 'trash').setClick(tag => this.deleteItem(tag.Id)),
        ),
    ];
  }
}
