import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../../@common/list/ListComponent';
import { ListTableColumn, SitesTableColumn } from '../../@common/list/ListTableColumn';
import { ListTableColumnType } from '../../@common/list/ListEnums';
import { ListTableColumnAction } from '../../@common/list/ListTableColumnAction';
import { PageContext } from '../../@common/PageComponent';
import { ServicesProvider } from '../../@services/ServicesProvider';
import { Page } from '../../@models/Page';
import { Site } from '../../@models/Site';
import { Icon } from 'app/@common/shared/icon/Icon';

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './list.component.html',
    providers: [PageContext]
})
export class PagesListComponent extends ListComponent<Page> implements OnInit {
    private sites: Site[];

    constructor(context: PageContext, private servicesProvider: ServicesProvider) {
        super(context, servicesProvider.PagesService);

        this.setTitle('Список страниц');
        this.provider.itemsPerPage = 20;
        this.addUrl = '/pages/add';
    }

    ngOnInit(): void {
        this.servicesProvider.SitesService.getAll(1, 100, 'id').subscribe(res => {
            this.sites = res.Data;
            this.Init();
        });
    }

    protected GetColumns(): ListTableColumn<Page>[] {
        return [
            new ListTableColumn<Page>('Id', '#').setSortable(),
            new ListTableColumn<Page>('Title', 'Заголовок').setSortable().setLinkGetter(page => {
                return ['/pages', page.Id, 'edit'];
            }),
            /*.setDisabled(!this.can(UserRights.AddNews))*/ new ListTableColumn<Page>(
                'DateAdded',
                'Дата',
                ListTableColumnType.TimeAgo
            ).setSortable(),
            new SitesTableColumn<Page>('SiteIds', 'Сайты', this.sites),
            new ListTableColumn<Page>('Actions', '')
                .AddAction(
                    new ListTableColumnAction<Page>(
                        'Просмотреть на сайте',
                        new Icon('fa-globe')
                    ).setExternal(page => page.Url)
                )
                .AddAction(
                    new ListTableColumnAction<Page>('Удалить', new Icon('fa-trash')).setClick(
                        Developer => this.deleteItem(Developer)
                    )
                )
        ];
    }
}
