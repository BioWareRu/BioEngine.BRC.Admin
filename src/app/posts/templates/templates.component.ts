import { Component, OnInit } from '@angular/core';
import { Icon } from '@common/shared/icon/Icon';
import { AbstractListComponent } from '@common/list/AbstractListComponent';
import { ListTableColumnType } from '@common/list/ListEnums';
import { ListTableColumn } from '@common/list/ListTableColumn';
import { AuthorTableColumn } from '@common/list/AuthorTableColumn';
import { TagsTableColumn } from '@common/list/TagsTableColumn';
import { SectionsTableColumn } from '@common/list/SectionsTableColumn';
import { ListTableColumnAction } from '@common/list/ListTableColumnAction';
import { PageContext } from '@common/PageContext';
import { ContentItemTemplate } from '@models/ContentItemTemplate';
import { ServicesProvider } from '@services/ServicesProvider';

@Component({
    selector: 'posts-list',
    templateUrl: './templates.component.html',
    providers: [PageContext]
})
export class TemplatesListComponent extends AbstractListComponent<ContentItemTemplate> implements OnInit {
    constructor(private readonly _servicesProvider: ServicesProvider, context: PageContext) {
        super(_servicesProvider.postTemplatesService, context);

        context.stateService.setTitle('Список шаблонов постов');
        this.provider.itemsPerPage = 20;
    }

    ngOnInit(): void {
        this._init();
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
