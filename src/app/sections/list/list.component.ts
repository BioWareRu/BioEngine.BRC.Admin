import { Component, OnInit } from '@angular/core';
import { Icon } from '@common/shared/icon/Icon';
import { map } from 'rxjs/operators';
import { Filter, FilterOperator } from '@common/Filter';
import { AbstractListComponent } from '@common/list/abstract-list-component';
import { ListTableColumnType } from '@common/list/ListEnums';
import { ListTableColumn, SitesTableColumn } from '@common/list/ListTableColumn';
import { ListTableColumnAction } from '@common/list/ListTableColumnAction';
import { PageContext } from '@common/abstract-page-component';
import { BaseSection, SectionType } from '@models/abstract-section';
import { ServicesProvider } from '@services/ServicesProvider';

@Component({
    selector: 'sections-list',
    templateUrl: './list.component.html',
    providers: [PageContext]
})
export class SectionsListComponent extends AbstractListComponent<BaseSection> implements OnInit {
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

    protected _getColumns(): Array<ListTableColumn<BaseSection>> {
        return [
            new ListTableColumn<BaseSection>('title', 'Заголовок')
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
                }),
            new ListTableColumn<BaseSection>('typeTitle', 'Тип').setHidden(!this._showType),
            /*.setDisabled(!this.can(UserRights.AddNews))*/ new ListTableColumn<BaseSection>(
                'dateAdded',
                'Дата',
                ListTableColumnType.TimeAgo
            ).setSortable(),
            new SitesTableColumn<BaseSection>('siteIds', 'Сайты'),
            new ListTableColumn<BaseSection>('actions', '')
                .addAction(
                    new ListTableColumnAction<BaseSection>(
                        'Просмотреть на сайте',
                        new Icon('fa-globe')
                    ).setExternal(secion => secion.url)
                )
                .addAction(
                    new ListTableColumnAction<BaseSection>(
                        'Удалить',
                        new Icon('fa-trash')
                    ).setClick(section => this.deleteItem(section))
                )
        ];
    }
}
