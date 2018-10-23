import {BaseService} from '../BaseService';
import {OnInit} from '@angular/core';
import {ListProvider} from './ListProvider';
import {Model} from '../../@models/base/Model';
import {ListTableColumn} from './ListTableColumn';
import {PageComponent, PageContext} from '../PageComponent';

export abstract class ListComponent<T extends Model> extends PageComponent implements OnInit {

  public provider: ListProvider<T>;
  public addUrl = '';

  protected constructor(context: PageContext, private service: BaseService<T>) {
    super(context);
    this.provider = new ListProvider<T>(this.service, this.Router, this.Route);
    this.provider.getRowClass = this.getRowClass;
  }

  protected abstract GetColumns(): ListTableColumn<T>[];

  ngOnInit(): void {
    this.Init();
  }

  public deleteItem(id: number): void {
    this.service.delete(id).subscribe((res: boolean) => {
      if (res) {
        this.provider.load();
      }
    });
  }

  public getRowClass(model: T): { [key: string]: boolean } {
    return {};
  }

  protected Init(): void {
    this.provider.columns = this.GetColumns();
    this.provider.init();
  }
}
