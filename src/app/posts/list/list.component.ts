import { Component, OnInit } from '@angular/core';
import { Icon } from '@common/shared/icon/Icon';
import { AbstractListComponent } from '@common/list/AbstractListComponent';
import { ListTableColumnType } from '@common/list/ListEnums';
import { ListTableColumn } from '@common/list/ListTableColumn';
import { AuthorTableColumn } from '@common/list/AuthorTableColumn';
import { TagsTableColumn } from '@common/list/TagsTableColumn';
import { SectionsTableColumn } from '@common/list/SectionsTableColumn';
import { SitesTableColumn } from '@common/list/SitesTableColumn';
import { ListTableColumnAction } from '@common/list/ListTableColumnAction';
import { PageContext } from '@common/PageContext';
import { SnackBarMessage } from '@common/snacks/SnackBarMessage';
import { Post } from '@models/Post';
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
        this._servicesProvider.postsService.createTemplate(content.id).subscribe(() => {
            this.snackBarService.success(new SnackBarMessage('Успех', 'Шаблон успешно создан'));
        });
    }
}
