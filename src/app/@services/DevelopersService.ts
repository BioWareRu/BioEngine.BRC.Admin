import {Injectable} from "@angular/core";
import {BaseService} from "../@common/BaseService";
import {Developer} from "../@models/Developer";
import {RestClient} from "../@common/HttpClient";
import {Observable} from "rxjs/Observable";
import {ListResult} from "../@common/list/ListResult";
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {DeveloperListResult, SaveDeveloperResponse} from "../@models/results/Developer";

@Injectable()
export class DevelopersService extends BaseService<Developer> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  add(item: any): Observable<any> {
    return this.doAdd('developers', item).pipe(map(res => plainToClass(SaveDeveloperResponse, res as SaveDeveloperResponse)));
  }

  delete(id: number): Observable<any> {
    return this.doDelete('developers', id).pipe(map(res => true));
  }

  get(id: number): Observable<Developer> {
    return this.getOne('developers', id).pipe(map(res => plainToClass(Developer, res as Developer)));
  }

  getList(page: number, perPage: number, sort: string): Observable<ListResult<Developer>> {
    return this.getAll('developers', page, perPage, sort).pipe(map(res => plainToClass(DeveloperListResult, res as DeveloperListResult)));
  }

  update(id: number, item: any): Observable<any> {
    return this.doUpdate('developers', id, item).pipe(map(res => plainToClass(SaveDeveloperResponse, res as SaveDeveloperResponse)));
  }

}
