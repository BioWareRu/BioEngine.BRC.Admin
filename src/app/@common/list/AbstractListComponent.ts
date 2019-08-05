import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Params } from '@angular/router';
import { AbstractBaseService, AbstractEntity, Filter, ListTableColumn, ListTableComponent, ListTableState } from 'bioengine-angular';
import { AbstractPageComponent } from '../AbstractPageComponent';
import { PageContext } from '../PageContext';

export abstract class AbstractListComponent<T extends AbstractEntity> extends AbstractPageComponent
    implements OnInit, AfterViewInit {
    public addUrl = '';
    public isInitialized = false;
    public page: number;
    public itemsPerPage: number;
    public sort = '-dateAdded';
    public filter: Filter | null = null;
    @ViewChild(ListTableComponent, {static: true}) public listTable: ListTableComponent<T>;

    protected constructor(public service: AbstractBaseService<T>, context: PageContext) {
        super(context);
    }

    ngOnInit(): void {
        this.listTable.onStateChange().subscribe(state => {
            this._reload(state);
        });
        this.listTable.setColumns(this._getColumns());
    }

    ngAfterViewInit(): void {
        this._route.queryParamMap.subscribe(params => {
            this.isInitialized = false;
            const pageNumber = parseInt(params.get('page') || '0', 10);
            const perPage = parseInt(params.get('perPage') || '0', 10);
            if (pageNumber >= 1) {
                this.page = pageNumber;
            } else {
                this.page = 0;
            }
            if (perPage >= 1) {
                this.itemsPerPage = perPage;
            } else {
                this.itemsPerPage = 20;
            }
            const sortStr = params.get('sort');
            if (sortStr !== null && sortStr !== '') {
                this.sort = sortStr;
            }

            const filterStr = params.get('filter');
            if (filterStr !== null && filterStr !== '') {
                this.filter = Filter.fromString(filterStr);
            }

            this._route.params.subscribe(routeParams => {
                this._beforeLoad(routeParams);

                this._load();
                this.isInitialized = true;
            });

        });
    }

    // tslint:disable-next-line:no-unused
    protected _beforeLoad(queryParams: Params): void {

    }

    protected _load(): void {
        this.listTable.load(this.page, this.filter, this.itemsPerPage, this.sort);
    }

    private _reload(state: ListTableState): void {
        this._router.navigate([], {
            queryParams: {
                page: state.currentPage,
                perPage: state.itemsPerPage,
                sort: state.sort,
                filter: state.filter ? state.filter.toString() : ''
            },
            relativeTo: this._route
        });
    }

    public deleteItem(model: T): void {
        this._dialogService.confirm(
            `Удаление записи "${model.title}"`,
            `Вы точно хотите удалить запись "${model.title}"?`
        ).onConfirm.subscribe(() => {
            this.listTable.dataLoaded = false;
            this.service.delete(model.id).subscribe((res: boolean) => {
                if (res) {
                    this._load();
                }
            });
        });
    }

    protected abstract _getColumns(): Array<ListTableColumn<T>>;

}
