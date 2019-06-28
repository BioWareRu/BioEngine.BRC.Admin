import { OnInit } from '@angular/core';
import { AbstractBaseService, AbstractEntity, Filter, ListProvider, ListProviderState, ListTableColumn } from 'bioengine.core.api.client';
import { AbstractPageComponent } from '../AbstractPageComponent';
import { PageContext } from '../PageContext';

export abstract class AbstractListComponent<T extends AbstractEntity> extends AbstractPageComponent
    implements OnInit {
    public provider: ListProvider<T>;
    public addUrl = '';
    public columns: Array<ListTableColumn<T>> = [];
    public isInitialized = false;
    protected _page = 0;
    protected _itemsPerPage = 20;
    protected _sort = '-dateAdded';
    protected _filter: Filter | null = null;

    protected constructor(
        protected readonly _service: AbstractBaseService<T>,
        context: PageContext
    ) {
        super(context);

    }

    ngOnInit(): void {
        this._route.queryParamMap.subscribe(params => {
            const pageNumber = parseInt(params.get('_page') || '0', 10);
            const perPage = parseInt(params.get('perPage') || '0', 10);
            if (pageNumber >= 1) {
                this._page = pageNumber;
            }
            if (perPage >= 1) {
                this._itemsPerPage = perPage;
            }
            const sortStr = params.get('_sort');
            if (sortStr !== null) {
                this._sort = sortStr;
            }

            const filterStr = params.get('_filter');
            if (filterStr !== null && filterStr !== '') {
                this._filter = Filter.fromString(filterStr);
            }
            this.provider = new ListProvider<T>(
                this._service,
                this._filter,
                this._page,
                this._itemsPerPage,
                this._sort
            );
            this.provider.onStateChange().subscribe(state => {
                this._reload(state);
            });
            this._init();
        });
    }

    private _reload(state: ListProviderState): void {
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
            this.provider.dataLoaded = false;
            this._service.delete(model.id).subscribe((res: boolean) => {
                if (res) {
                    this.provider.load();
                }
            });
        });
    }

    protected abstract _getColumns(): Array<ListTableColumn<T>>;

    protected _init(): void {
        this.columns = this._getColumns();
        this.isInitialized = true;
    }
}
