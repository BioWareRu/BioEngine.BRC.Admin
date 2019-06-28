import { Component, OnInit } from '@angular/core';
import {
    AbstractSection,
    Filter,
    FilterOperator,
    Icon,
    ListTableColumn,
    ListTableColumnAction,
    ListTableColumnType,
    SectionsService,
    SitesTableColumn
} from 'bioengine-angular';
import { map } from 'rxjs/operators';
import { AbstractListComponent } from '@common/list/AbstractListComponent';
import { PageContext } from '@common/PageContext';
import { SectionType } from '@models/SectionType';

@Component({
    selector: 'sections-list',
    templateUrl: './SectionsListComponent.html',
    providers: [PageContext]
})
export class SectionsListComponent extends AbstractListComponent<AbstractSection> implements OnInit {
    private _showType = true;

    constructor(context: PageContext, sectionsService: SectionsService) {
        super(sectionsService, context);

        context.stateService.setTitle('Список разделов');
    }

    ngOnInit(): void {
        this._route.params.pipe(map(p => p.type)).subscribe(type => {
            this._showType = false;
            switch (type) {
                case 'developers':
                    this._filter = Filter.simple('type', FilterOperator.Equal, SectionType.Developer);
                    this._setTitle('Разработчики');
                    this.addUrl = '/sections/developers/add';
                    break;
                case 'games':
                    this._filter = Filter.simple('type', FilterOperator.Equal, SectionType.Game);
                    this._setTitle('Игры');
                    this.addUrl = '/sections/games/add';
                    break;
                case 'topics':
                    this._filter = Filter.simple('type', FilterOperator.Equal, SectionType.Topic);
                    this._setTitle('Темы');
                    this.addUrl = '/sections/topics/add';
                    break;
                default:
                    this._showType = true;
                    break;
            }
            super.ngOnInit();
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
