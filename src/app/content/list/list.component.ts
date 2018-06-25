import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ListComponent} from '../../@common/list/ListComponent';
import {Post} from '../../@models/Post';
import {ActivatedRoute, Router} from '@angular/router';
import {ServicesProvider} from '../../@services/ServicesProvider';
import {ListTableColumn} from '../../@common/list/ListTableColumn';
import {ListTableColumnType} from '../../@common/list/ListEnums';
import {ListTableColumnAction} from '../../@common/list/ListTableColumnAction';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './list.component.html',
})
export class ContentListComponent extends ListComponent<Post> {
  constructor(repository: ServicesProvider, router: Router, route: ActivatedRoute) {
    super(repository.PostsService, router, route);

    this.title = 'Список постов';
    this.cardTitle = 'Посты';
    this.cardIcon = 'assignment';
    this.provider.itemsPerPage = 20;
  }

  protected GetColumns(): ListTableColumn<Post>[] {
    return [
      new ListTableColumn<Post>('id', '#').setSortable(),
      new ListTableColumn<Post>('title', 'Заголовок').setSortable()
        .setLinkGetter(post => ['/posts', post.Id, 'edit'])
      /*.setDisabled(!this.can(UserRights.AddNews))*/,
      new ListTableColumn<Post>('dateAdded', 'Дата', ListTableColumnType.TimeAgo).setSortable(),
      new ListTableColumn<Post>('parent', 'Раздел').setCustomGetter((post) => '-'),
      new ListTableColumn<Post>('authorId', 'Автор').setCustomGetter((post) => '-').setSortable(),
      new ListTableColumn<Post>('actions', '')
        .AddAction(
          new ListTableColumnAction<Post>('Просмотреть на сайте', 'file').setExternal(post => '#'),
        )
        .AddAction(
          new ListTableColumnAction<Post>('Удалить пост', 'trash').setClick(post => this.deleteItem(post.Id)),
        ),
    ];
  }
}
