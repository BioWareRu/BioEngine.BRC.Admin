import {BaseService} from '../BaseService';
import {OnInit} from '@angular/core';
import {ListProvider} from './ListProvider';
import {Model} from '../../@models/base/Model';
import {ListTableColumn} from "./ListTableColumn";
import {PageComponent, PageContext} from "../PageComponent";

export abstract class ListComponent<T extends Model> extends PageComponent implements OnInit {

  public provider: ListProvider<T>;
  public addUrl = '';

  protected constructor(context: PageContext, private service: BaseService<T>) {
    super(context);
    this.provider = new ListProvider<T>(this.service, this.Router, this.Route);
    this.provider.getRowClass = this.getRowClass;
  }

  protected abstract GetColumns(): ListTableColumn<T>[];

  ngOnInit() {
    this.Init();
  }

  protected Init() {
    this.provider.columns = this.GetColumns();
    this.provider.init();
  }

  public getRowClass(model: T): { [key: string]: boolean } {
    return {};
  }

  public deleteItem(id: number) {
    this.service.delete(id).subscribe((res: boolean) => {
      if (res) {
        this.provider.load();
      }
    });
  }
}
