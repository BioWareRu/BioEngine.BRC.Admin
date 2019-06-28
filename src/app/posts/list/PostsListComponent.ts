import { Component, OnInit } from '@angular/core';
import { AbstractListComponent } from '@common/list/AbstractListComponent';
import { PageContext } from '@common/PageContext';
import { PostTemplatesService } from '@services/PostTemplatesService';
import {
    AuthorTableColumn,
    Icon,
    ListTableColumn,
    ListTableColumnAction,
    ListTableColumnType,
    Post, PostsService,
    SectionsTableColumn,
    SitesTableColumn,
    SnackBarMessage,
    TagsTableColumn
} from 'bioengine.core.api.client';

@Component({
    selector: 'posts-list',
    templateUrl: './PostsListComponent.html',
    providers: [PageContext]
})
export class PostsListComponent extends AbstractListComponent<Post> implements OnInit {
    constructor(private readonly _postTemplatesService: PostTemplatesService, context: PageContext, postsService: PostsService) {
        super(postsService, context);

        context.stateService.setTitle('Список постов');
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
                .addActions(post => {
                        const actions: ListTableColumnAction<Post>[] = [];
                        post.publicUrls.forEach(url => {
                            actions.push(new ListTableColumnAction<Post>(
                                'Просмотреть на ' + url.site.title,
                                new Icon('fa-globe')
                            ).setExternal(url.url));
                        });
                        return actions;
                    }
                )
                .addAction(
                    new ListTableColumnAction<Post>('Сохранить как шаблон', new Icon('fa-clone'))
                        .setClick(content => this._createTemplate(content)))
                .addAction(
                    new ListTableColumnAction<Post>('Удалить', new Icon('fa-trash')).setClick(
                        content => this.deleteItem(content)
                    )
                )
        ];
    }

    private _createTemplate(content: Post): void {
        this._postTemplatesService.createTemplate(content.id).subscribe(() => {
            this.snackBarService.success(new SnackBarMessage('Успех', 'Шаблон успешно создан'));
        });
    }
}
