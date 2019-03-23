import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../../@common/list/ListComponent';
import { ServicesProvider } from '../../@services/ServicesProvider';
import {
    AuthorTableColumn,
    ListTableColumn,
    SectionsTableColumn,
    SitesTableColumn,
    TagsTableColumn
} from '../../@common/list/ListTableColumn';
import { ListTableColumnType } from '../../@common/list/ListEnums';
import { ListTableColumnAction } from '../../@common/list/ListTableColumnAction';
import { Post } from '../../@models/posts/Post';
import { PageContext } from '../../@common/PageComponent';
import { Icon } from 'app/@common/shared/icon/Icon';

@Component({
    selector: 'posts-list',
    templateUrl: './list.component.html',
    providers: [PageContext]
})
export class ContentListComponent extends ListComponent<Post> implements OnInit {
    constructor(context: PageContext, private servicesProvider: ServicesProvider) {
        super(context, servicesProvider.PostsService);

        context.StateService.setTitle('Список постов');
        this.provider.itemsPerPage = 20;
    }

    ngOnInit(): void {
        this.Init();
    }

    protected GetColumns(): ListTableColumn<Post>[] {
        return [
            // new ListTableColumn<Post>('Id', '#').setSortable(),
            new ListTableColumn<Post>('Title', 'Заголовок').setSortable().setLinkGetter(content => {
                return ['/posts/', content.Id, 'edit'];
            }),
            new ListTableColumn<Post>(
                'DateAdded',
                'Дата',
                ListTableColumnType.TimeAgo
            ).setSortable(),
            new SitesTableColumn<Post>('SiteIds', 'Сайты'),
            new SectionsTableColumn<Post>('SectionIds', 'Разделы'),
            new TagsTableColumn<Post>('TagIds', 'Тэги'),
            new AuthorTableColumn<Post>('Author', 'Автор'),
            new ListTableColumn<Post>('Actions', '')
                .AddAction(
                    new ListTableColumnAction<Post>(
                        'Просмотреть на сайте',
                        new Icon('fa-globe')
                    ).setExternal(content => content.Url)
                )
                .AddAction(
                    new ListTableColumnAction<Post>('Удалить', new Icon('fa-trash')).setClick(
                        content => this.deleteItem(content)
                    )
                )
        ];
    }
}
