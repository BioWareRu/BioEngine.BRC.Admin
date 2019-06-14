import { Component, OnInit } from '@angular/core';
import { Icon } from '@common/shared/icon/Icon';
import { AbstractSection } from '@models/base/AbstractSection';
import { map } from 'rxjs/operators';
import { Filter } from '@common/Filter';
import { FilterOperator } from '@common/FilterOperator';
import { AbstractListComponent } from '@common/list/AbstractListComponent';
import { ListTableColumnType } from '@common/list/ListEnums';
import { ListTableColumn } from '@common/list/ListTableColumn';
import { SitesTableColumn } from '@common/list/SitesTableColumn';
import { ListTableColumnAction } from '@common/list/ListTableColumnAction';
import { PageContext } from '@common/PageContext';
import { SectionType } from '@models/SectionType';
import { ServicesProvider } from '@services/ServicesProvider';

@Component({
    selector: 'sections-list',
    templateUrl: './list.component.html',
    providers: [PageContext]
})
export class SectionsListComponent extends AbstractListComponent<AbstractSection> implements OnInit {
    private _showType = true;

    constructor(private readonly _servicesProvider: ServicesProvider, context: PageContext) {
        super(_servicesProvider.sectionsService, context);

        context.stateService.setTitle('Список разделов');
        this.provider.itemsPerPage = 20;
    }

    ngOnInit(): void {
        this._route.params.pipe(map(p => p.type)).subscribe(type => {
            this._showType = false;
            switch (type) {
                case 'developers':
                    this.provider.applyFilter(
                        Filter.simple('type', FilterOperator.Equal, SectionType.Developer)
                    );
                    this._setTitle('Разработчики');
                    this.addUrl = '/sections/developers/add';
                    break;
                case 'games':
                    this.provider.applyFilter(
                        Filter.simple('type', FilterOperator.Equal, SectionType.Game)
                    );
                    this._setTitle('Игры');
                    this.addUrl = '/sections/games/add';
                    break;
                case 'topics':
                    this.provider.applyFilter(
                        Filter.simple('type', FilterOperator.Equal, SectionType.Topic)
                    );
                    this._setTitle('Темы');
                    this.addUrl = '/sections/topics/add';
                    break;
                default:
                    this._showType = true;
                    break;
            }
            this._init();
        });
    }

    protected _getColumns(): Array<ListTableColumn<AbstractSection>> {
        return [
            new ListTableColumn<AbstractSection>('title', 'Заголовок')
                .setSortable()
                .setLinkGetter(section => {
                    switch (section.type) {
                        case SectionType.Developer:
                            return ['/sections/developers', section.id, 'edit'];
                        case SectionType.Game:
                            return ['/sections/games', section.id, 'edit'];
                        case SectionType.Topic:
                            return ['/sections/topics', section.id, 'edit'];
                    }
                    return {};
                }),
            new ListTableColumn<AbstractSection>('typeTitle', 'Тип').setHidden(!this._showType),
            /*.setDisabled(!this.can(UserRights.AddNews))*/ new ListTableColumn<AbstractSection>(
                'dateAdded',
                'Дата',
                ListTableColumnType.TimeAgo
            ).setSortable(),
            new SitesTableColumn<AbstractSection>('siteIds', 'Сайты'),
            new ListTableColumn<AbstractSection>('actions', '')
                .addActions(section => {
                        const actions: ListTableColumnAction<AbstractSection>[] = [];
                        section.publicUrls.forEach(url => {
                            actions.push(new ListTableColumnAction<AbstractSection>(
                                'Просмотреть на ' + url.site.title,
                                new Icon('fa-globe')
                            ).setExternal(url.url));
                        });
                        return actions;
                    }
                )
                .addActions(section =>
                    [
                        new ListTableColumnAction<AbstractSection>(
                            'Удалить',
                            new Icon('fa-trash')
                        ).setClick(() => this.deleteItem(section))
                    ]
                )
        ];
    }
}
