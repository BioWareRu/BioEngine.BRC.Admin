import {Component, OnInit} from '@angular/core';
import {ListComponent} from '../../@common/list/ListComponent';
import {ServicesProvider} from '../../@services/ServicesProvider';
import {ListTableColumn, SitesTableColumn} from '../../@common/list/ListTableColumn';
import {ListTableColumnType} from '../../@common/list/ListEnums';
import {ListTableColumnAction} from '../../@common/list/ListTableColumnAction';
import {BaseSection, SectionType} from '../../@models/Section';
import {Site} from '../../@models/Site';
import {map} from 'rxjs/operators';
import {PageContext} from '../../@common/PageComponent';
import {Filter, FilterOperator} from '../../@common/Filter';

@Component({
    selector: 'sections-list',
    templateUrl: './list.component.html',
    providers: [
        PageContext
    ]
})
export class SectionsListComponent extends ListComponent<BaseSection> implements OnInit {
    private sites: Site[];

    constructor(context: PageContext, private servicesProvider: ServicesProvider) {
        super(context, servicesProvider.SectionsService);

        context.StateService.setTitle('Список разделов');
        this.provider.itemsPerPage = 20;
    }

    ngOnInit(): void {
        this.Route.params.pipe(map(p => p.type)).subscribe(type => {
            switch (type) {
                case 'developers':
                    this.provider.applyFilter(Filter.simple('Type', FilterOperator.Equal, SectionType.Developer));
                    this.StateService.setTitle('Разработчики');
                    this.addUrl = '/sections/developers/add';
                    break;
                case 'games':
                    this.provider.applyFilter(Filter.simple('Type', FilterOperator.Equal, SectionType.Game));
                    this.StateService.setTitle('Игры');
                    this.addUrl = '/sections/games/add';
                    break;
                case 'topics':
                    this.provider.applyFilter(Filter.simple('Type', FilterOperator.Equal, SectionType.Topic));
                    this.StateService.setTitle('Темы');
                    this.addUrl = '/sections/topics/add';
                    break;
                default:
                    break;
            }
            this.servicesProvider.SitesService.getAll(1, 100, 'id').subscribe(res => {
                this.sites = res.Data;
                this.Init();
            });
        });

    }

    protected GetColumns(): ListTableColumn<BaseSection>[] {
        return [
            new ListTableColumn<BaseSection>('Id', '#').setSortable(),
            new ListTableColumn<BaseSection>('TypeTitle', 'Тип'),
            new ListTableColumn<BaseSection>('Title', 'Заголовок').setSortable()
                .setLinkGetter(section => {
                    switch (section.Type) {
                        case SectionType.Developer:
                            return ['/sections/developers', section.Id, 'edit'];
                        case SectionType.Game:
                            return ['/sections/games', section.Id, 'edit'];
                        case SectionType.Topic:
                            return ['/sections/topics', section.Id, 'edit'];
                    }
                })
            /*.setDisabled(!this.can(UserRights.AddNews))*/,
            new ListTableColumn<BaseSection>('DateAdded', 'Дата', ListTableColumnType.TimeAgo).setSortable(),
            new SitesTableColumn<BaseSection>('SiteIds', 'Сайты', this.sites),
            new ListTableColumn<BaseSection>('Actions', '')
                .AddAction(
                    new ListTableColumnAction<BaseSection>('Просмотреть на сайте', 'globe').setExternal(secion => secion.Url),
                )
                .AddAction(
                    new ListTableColumnAction<BaseSection>('Удалить', 'trash').setClick(Developer => this.deleteItem(Developer.Id)),
                ),
        ];
    }
}
