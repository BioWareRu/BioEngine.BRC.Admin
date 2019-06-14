import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractEntity } from '@models/base/AbstractEntity';
import { AbstractBaseService } from '../AbstractBaseService';
import { Filter } from '../Filter';
import { ListTableColumn } from './ListTableColumn';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

export class ListProvider<T extends AbstractEntity> implements DataSource<T> {
    public items: Subject<Array<T>>;
    public itemsPerPage = 10;
    public columns: Array<ListTableColumn<T>>;
    public paginator: MatPaginator;
    public sorter: MatSort;
    public dataLoaded = false;
    private _currentPage = 0;
    private _sort = '-dateAdded';

    constructor(
        private readonly _service: AbstractBaseService<T>,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private _filter: Filter | null = null
    ) {
    }

    public init(): void {
        this.items = new BehaviorSubject<Array<T>>([]);

        this.paginator.page.subscribe(e => {
            this.itemsPerPage = e.pageSize;
            this.changePage(e.pageIndex);
        });
        this.sorter.sortChange.subscribe(e => {
            this.applySort(e.active, e.direction);
        });
        this._route.queryParamMap.subscribe(params => {
            const pageNumber = parseInt(params.get('page') || '0', 10);
            const perPage = parseInt(params.get('perPage') || '0', 10);
            if (pageNumber >= 1) {
                this._currentPage = pageNumber;
            }
            if (perPage >= 1) {
                this.itemsPerPage = perPage;
            }
            this.paginator.pageSize = this.itemsPerPage;
            const sort = params.get('sort') || this._sort;
            if (sort !== null) {
                this._sort = sort;
                const key = this._sort.replace('-', '');
                const sortDirection: SortDirection = this._sort.indexOf('-') > -1 ? 'desc' : 'asc';
                this.sorter.active = key;
                this.sorter.direction = sortDirection;
            }
            const filter = params.get('filter');
            if (filter !== null && filter !== '') {
                this._filter = Filter.fromString(filter);
            }
            this.load(this._currentPage);
        });
    }

    public load(page?: number): void {
        this.dataLoaded = false;
        page = page ? page : this._currentPage;
        this._service
            .getAll(page, this.paginator.pageSize, this._sort, this._filter)
            .subscribe(res => {
                this.paginator.pageIndex = <number>page;
                this.paginator.length = res.totalItems;
                this.items.next(res.data);
                this.dataLoaded = true;
            });
    }

    public changePage(page: number): void {
        this._currentPage = page;
        this._reload();
    }

    public applySort(column: string, direction: SortDirection): void {
        let sortKey;
        switch (direction) {
            case 'asc':
                sortKey = column;
                break;
            case 'desc':
                sortKey = '-' + column;
                break;
            case '':
                break;
        }
        this._sort = sortKey;
        this._reload();
    }

    public applyFilter(filter: Filter): void {
        this._filter = filter;
        this._reload();
    }

    private _reload(): void {
        this._router.navigate([], {
            queryParams: {
                page: this._currentPage,
                perPage: this.itemsPerPage,
                sort: this._sort,
                filter: this._filter ? this._filter.toString() : ''
            },
            relativeTo: this._route
        });
    }

    connect(_: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
        return this.items.asObservable();
    }

    disconnect(_: CollectionViewer): void {
        this.items.complete();
    }
}
