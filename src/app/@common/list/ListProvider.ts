import {Model} from '../../@models/base/Model';
import {Subject} from 'rxjs/Subject';
import {BaseService} from '../BaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {ListTableColumn} from './ListTableColumn';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {SortDirection} from '../SortDirection';
import {ListTableColumnActionType, ListTableColumnType} from './ListEnums';

export class ListProvider<T extends Model> {

  public currentPage = 1;
  public itemsPerPage = 10;
  public totalItems = 0;
  public dataLoaded = false;
  public items: Subject<T[]>;
  public columns: ListTableColumn<T>[];
  public sortDirection = SortDirection;
  public columnTypes = ListTableColumnType;
  public actionTypes = ListTableColumnActionType;
  protected title = 'Список';
  private sort = '-id';
  public getRowClass: (model: T) => { [key: string]: boolean };

  private static getSortKey(column: string, desc: boolean = false): string {
    let sortKey = column;
    if (desc) {
      sortKey = '-' + sortKey;
    }
    return sortKey;
  }

  constructor(private service: BaseService<T>, private router: Router,
              private route: ActivatedRoute/*, private _userService: UserService*/) {
  }

  public setService(service: BaseService<T>): void {
    this.service = service;
  }

  public init(): void {
    this.items = new BehaviorSubject<T[]>([]);
    this.route.queryParamMap.subscribe(params => {
      const pageNumber = parseInt(params.get('page'), 10);
      if (pageNumber >= 1) {
        this.currentPage = pageNumber;
      }
      const sort = params.get('sort');
      if (sort != null) {
        this.sort = sort;
        const key = this.sort.replace('-', '');
        const sortDirection = this.sort.indexOf('-') > -1 ? SortDirection.Desc : SortDirection.Asc;
        this.columns.forEach(col => {
          col.setSorted(col.Key === key ? sortDirection : null);
        });
      }
      this.load(this.currentPage);
    });
  }

  public applySort(column: string): void {
    let sortKey;
    if (this.sort === column) {
      sortKey = ListProvider.getSortKey(column, true);
    } else {
      sortKey = ListProvider.getSortKey(column);
    }
    this.sort = sortKey;
    this.reload();
  }

  public changePage(page: number): void {
    this.currentPage = page;
    this.reload();
  }

  public load(page?: number): void {
    page = page ? page : this.currentPage;
    this.service.getAll(page, this.itemsPerPage, this.sort).subscribe((res) => {
      this.items.next(res.Data);
      this.totalItems = res.TotalItems;
      this.currentPage = page;
      this.dataLoaded = true;
    });
  }

  private reload(): void {
    this.router.navigate([], {queryParams: {page: this.currentPage, sort: this.sort}, relativeTo: this.route});
  }
}
