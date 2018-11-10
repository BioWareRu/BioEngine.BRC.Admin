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
import { BaseSection } from '../../@models/Section';
import { Site } from '../../@models/Site';
import { map } from 'rxjs/operators';
import { Post } from '../../@models/Post';
import { PageContext } from '../../@common/PageComponent';
import { Tag } from '../../@models/Tag';
import { forkJoin } from 'rxjs';
import { Filter, FilterOperator } from '../../@common/Filter';

@Component({
    selector: 'content-list',
    templateUrl: './list.component.html',
    providers: [PageContext]
})
export class ContentListComponent extends ListComponent<Post>
    implements OnInit {
    private sites: Site[];
    private sections: BaseSection[];
    private tags: Tag[];

    constructor(
        context: PageContext,
        private servicesProvider: ServicesProvider
    ) {
        super(context, servicesProvider.PostsService);

        context.StateService.setTitle('Список контента');
        this.provider.itemsPerPage = 20;
    }

    ngOnInit(): void {
        forkJoin(
            this.servicesProvider.SitesService.getAll(1, 100, 'id'),
            this.servicesProvider.SectionsService.getAll(1, 100, 'id'),
            this.servicesProvider.TagsService.getAll(1, 100, 'id')
        ).subscribe(res => {
            this.sites = res[0].Data;
            this.sections = res[1].Data;
            this.tags = res[2].Data;
            this.Init();
        });
    }

    protected GetColumns(): ListTableColumn<Post>[] {
        return [
            new ListTableColumn<Post>('Id', '#').setSortable(),
            new ListTableColumn<Post>('Title', 'Заголовок')
                .setSortable()
                .setLinkGetter(content => {
                    return ['/content/', content.Id, 'edit'];
                }),
            new ListTableColumn<Post>(
                'DateAdded',
                'Дата',
                ListTableColumnType.TimeAgo
            ).setSortable(),
            new SitesTableColumn<Post>('SiteIds', 'Сайты', this.sites),
            new SectionsTableColumn<Post>(
                'SectionIds',
                'Разделы',
                this.sections
            ),
            new TagsTableColumn<Post>('TagIds', 'Тэги', this.tags),
            new AuthorTableColumn<Post>('Author', 'Автор'),
            new ListTableColumn<Post>('Actions', '')
                .AddAction(
                    new ListTableColumnAction<Post>(
                        'Просмотреть на сайте',
                        'public'
                    ).setExternal(content => content.Url)
                )
                .AddAction(
                    new ListTableColumnAction<Post>(
                        'Удалить',
                        'delete'
                    ).setClick(content => this.deleteItem(content))
                )
        ];
    }
}
