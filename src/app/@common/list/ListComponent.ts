import {BaseService} from '../BaseService';
import {OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
// import {AppState} from '../AppState';
// import {UserRights, UserService} from '../../services/UserService';
import {ListProvider} from './ListProvider';
import {Model} from '../../@models/base/Model';
import {BaseSection, Section} from "../../@models/Section";
import {SitesService} from "../../@services/SitesService";
import {Site} from "../../@models/Site";
import {ListTableColumn} from "./ListTableColumn";

export abstract class ListComponent<T extends Model> implements OnInit {

  public provider: ListProvider<T>;

  protected title = 'Список';
  public cardTitle = '';
  public cardIcon = '';
  public addUrl = '';

  constructor(private service: BaseService<T>, private router: Router,
              protected route: ActivatedRoute) {
    this.provider = new ListProvider<T>(this.service, this.router, this.route);
    this.provider.getRowClass = this.getRowClass;
  }

  protected abstract GetColumns(): ListTableColumn<T>[];

  ngOnInit() {
    this.Init();
    // this._appState.notifyDataChanged('title', this.title);
  }

  protected Init() {
    this.provider.columns = this.GetColumns();
    this.provider.init();
  }

  public getRowClass(model: T): { [key: string]: boolean } {
    return {};
  }

  /*  public can(right: UserRights): boolean {
      return this._userService.hasRight(right);
    }*/

  public deleteItem(id: number) {
    this.service.delete(id).subscribe((res: boolean) => {
      if (res) {
        this.provider.load();
      }
    });
  }
}
