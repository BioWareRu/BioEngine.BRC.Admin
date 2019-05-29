import { Component, OnInit } from '@angular/core';
import { Icon } from '@common/shared/icon/Icon';
import { AbstractListComponent } from '@common/list/abstract-list-component';
import { ListTableColumnType } from '@common/list/ListEnums';
import { ListTableColumn } from '@common/list/ListTableColumn';
import { AuthorTableColumn } from "@common/list/AuthorTableColumn";
import { TagsTableColumn } from "@common/list/TagsTableColumn";
import { SectionsTableColumn } from "@common/list/SectionsTableColumn";
import { SitesTableColumn } from "@common/list/SitesTableColumn";
import { ListTableColumnAction } from '@common/list/ListTableColumnAction';
import { PageContext } from "@common/PageContext";
import { Post } from '@models/posts/Post';
import { ServicesProvider } from '@services/ServicesProvider';

@Component({
    selector: 'posts-list',
    templateUrl: './list.component.html',
    providers: [PageContext]
})
export class ContentListComponent extends AbstractListComponent<Post> implements OnInit {
    constructor(private readonly _servicesProvider: ServicesProvider, context: PageContext) {
        super(_servicesProvider.postsService, context);

        context.stateService.setTitle('Список постов');
        this.provider.itemsPerPage = 20;
    }

    ngOnInit(): void {
        this._init();
    }

    protected _getColumns(): Array<ListTableColumn<Post>> {
        return [
            // new ListTableColumn<Post>('id', '#').setSortable(),
            new ListTableColumn<Post>('title', 'Заголовок').setSortable().setLinkGetter(content => {
                return ['/posts/', content.id, 'edit'];
            }),
            new ListTableColumn<Post>(
                'dateAdded',
                'Дата',
                ListTableColumnType.TimeAgo
            ).setSortable(),
            new SitesTableColumn<Post>('siteIds', 'Сайты'),
            new SectionsTableColumn<Post>('sectionIds', 'Разделы'),
            new TagsTableColumn<Post>('tagIds', 'Тэги'),
            new AuthorTableColumn<Post>('author', 'Автор'),
            new ListTableColumn<Post>('actions', '')
                .addAction(
                    new ListTableColumnAction<Post>(
                        'Просмотреть на сайте',
                        new Icon('fa-globe')
                    ).setExternal(content => content.url)
                )
                .addAction(
                    new ListTableColumnAction<Post>('Удалить', new Icon('fa-trash')).setClick(
                        content => this.deleteItem(content)
                    )
                )
        ];
    }
}
