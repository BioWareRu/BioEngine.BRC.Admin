import { Component } from '@angular/core';
import { AbstractListComponent } from '@common/list/AbstractListComponent';
import { PageContext } from '@common/PageContext';
import { ContentItemTemplate } from '@models/ContentItemTemplate';
import { PostTemplatesService } from '@services/PostTemplatesService';
import { AuthorTableColumn, Icon, ListTableColumn, ListTableColumnAction, ListTableColumnType, SectionsTableColumn, TagsTableColumn } from 'bioengine-angular';

@Component({
    selector: 'posts-templates-list',
    templateUrl: './PostsTemplatesListComponent.html',
    providers: [PageContext]
})
export class PostsTemplatesListComponent extends AbstractListComponent<ContentItemTemplate> {
    constructor(context: PageContext, postTemplatesService: PostTemplatesService) {
        super(postTemplatesService, context);

        context.stateService.setTitle('Список шаблонов постов');
    }

    protected _getColumns(): Array<ListTableColumn<ContentItemTemplate>> {
        return [
            // new ListTableColumn<Post>('id', '#').setSortable(),
            new ListTableColumn<ContentItemTemplate>('title', 'Заголовок').setSortable(),
            new ListTableColumn<ContentItemTemplate>(
                'dateAdded',
                'Дата',
                ListTableColumnType.TimeAgo
            ).setSortable(),
            new SectionsTableColumn<ContentItemTemplate>('sectionIds', 'Разделы'),
            new TagsTableColumn<ContentItemTemplate>('tagIds', 'Тэги'),
            new AuthorTableColumn<ContentItemTemplate>('author', 'Автор'),
            new ListTableColumn<ContentItemTemplate>('actions', '')
                .addAction(
                    new ListTableColumnAction<ContentItemTemplate>('Создать пост', new Icon('fa-clone'))
                        .setClick(template => this._createPost(template)))
                .addAction(
                    new ListTableColumnAction<ContentItemTemplate>('Удалить', new Icon('fa-trash')).setClick(
                        template => this.deleteItem(template)
                    )
                )
        ];
    }

    private _createPost(template: ContentItemTemplate): void {
        this._router.navigate(['posts', 'add', 'template', template.id]);
    }
}
