import {Model} from '../../@models/base/Model';
import {Subject} from 'rxjs/Subject';
import {BaseService} from '../BaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {ListTableColumn} from './ListTableColumn';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {Filter} from '../Filter';
import {MatPaginator, MatSort, SortDirection} from '@angular/material';

export class ListProvider<T extends Model> {
    public items: Subject<T[]>;
    public itemsPerPage = 10;
    public columns: ListTableColumn<T>[];
    public paginator: MatPaginator;
    public sorter: MatSort;
    public dataLoaded = false;
    private currentPage = 0;
    private sort = '-id';

    constructor(private service: BaseService<T>, private router: Router,
                private route: ActivatedRoute, private filter: Filter = null) {
    }


    public init(): void {
        this.items = new BehaviorSubject<T[]>([]);

        this.paginator.page.subscribe(e => {
            console.log(e);
            this.itemsPerPage = e.pageSize;
            this.changePage(e.pageIndex);
        });
        this.sorter.sortChange.subscribe(e => {
            this.applySort(e.active, e.direction);
        });
        this.route.queryParamMap.subscribe(params => {
            const pageNumber = parseInt(params.get('page'), 10);
            const perPage = parseInt(params.get('perPage'), 10);
            if (pageNumber >= 1) {
                this.currentPage = pageNumber;
            }
            if (perPage >= 1) {
                this.itemsPerPage = perPage;
            }
            this.paginator.pageSize = this.itemsPerPage;
            const sort = params.get('sort') || this.sort;
            if (sort != null) {
                this.sort = sort;
                const key = this.sort.replace('-', '');
                const sortDirection: SortDirection = this.sort.indexOf('-') > -1 ? 'desc' : 'asc';
                this.sorter.active = key;
                this.sorter.direction = sortDirection;
            }
            const filter = params.get('filter');
            if (filter != null && filter !== '') {
                this.filter = Filter.fromString(filter);
            }
            this.load(this.currentPage);
        });
    }

    public load(page?: number): void {
        this.dataLoaded = false;
        page = page ? page : this.currentPage;
        this.service.getAll(page, this.paginator.pageSize, this.sort, this.filter).subscribe((res) => {
            this.items.next(res.Data);
            this.paginator.pageIndex = page;
            this.paginator.length = res.TotalItems;
            this.dataLoaded = true;
        });
    }

    public changePage(page: number): void {
        this.currentPage = page;
        this.reload();
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
        this.sort = sortKey;
        console.log(this.sort);
        this.reload();
    }

    public applyFilter(filter: Filter): void {
        this.filter = filter;
        this.reload();
    }

    private reload(): void {
        this.router.navigate([], {
            queryParams: {
                page: this.currentPage,
                perPage: this.itemsPerPage,
                sort: this.sort,
                filter: this.filter ? this.filter.toString() : ''
            },
            relativeTo: this.route
        });
    }
}
