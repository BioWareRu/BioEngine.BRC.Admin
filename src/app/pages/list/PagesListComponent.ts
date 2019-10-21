import { Component } from '@angular/core';
import { AbstractListComponent } from '@common/list/AbstractListComponent';
import { PageContext } from '@common/PageContext';
import { Icon, ListTableColumn, ListTableColumnAction, ListTableColumnType, Page, PagesService, SitesTableColumn } from 'bioengine-angular';

@Component({
    selector: 'pages-list',
    templateUrl: './PagesListComponent.html',
    providers: [PageContext]
})
export class PagesListComponent extends AbstractListComponent<Page> {
    constructor(pagesService: PagesService, context: PageContext) {
        super(pagesService, context);

        this._setTitle('Список страниц');
        this.addUrl = '/pages/add';
    }

    protected _getColumns(): Array<ListTableColumn<Page>> {
        return [
            new ListTableColumn<Page>('title', 'Заголовок').setSortable().setLinkGetter(page => {
                return ['/pages', page.id, 'edit'];
            }),
            /*.setDisabled(!this.can(UserRights.AddNews))*/ new ListTableColumn<Page>(
                'dateAdded',
                'Дата',
                ListTableColumnType.TimeAgo
            ).setSortable(),
            new SitesTableColumn<Page>('siteIds', 'Сайты'),
            new ListTableColumn<Page>('actions', '')
                .addActions(page => {
                        const actions: ListTableColumnAction<Page>[] = [];
                        page.publicUrls.forEach(url => {
                            actions.push(new ListTableColumnAction<Page>(
                                'Просмотреть на ' + url.site.title,
                                new Icon('fa-globe')
                            ).setExternal(url.url));
                        });
                        return actions;
                    }
                )
                .addAction(
                    new ListTableColumnAction<Page>('Удалить', new Icon('fa-trash')).setClick(
                        page => this.deleteItem(page)
                    )
                )
        ];
    }

    protected _getRowClassGenerator(): (model: Page) => string {
        return model => {
            return !model.isPublished ? 'unpublished' : 'published';
        };
    }
}
