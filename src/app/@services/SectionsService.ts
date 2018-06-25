import {Injectable} from "@angular/core";
import {BaseService} from "../@common/BaseService";
import {RestClient} from "../@common/HttpClient";
import {Observable} from "rxjs/Observable";
import {ListResult} from "../@common/list/ListResult";
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {BaseSection} from "../@models/Section";
import {SectionsListResult} from "../@models/results/BaseSection";

@Injectable()
export class SectionsService extends BaseService<BaseSection> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  add(item: any): Observable<any> {
    throw new Error("read only service");
  }

  delete(id: number): Observable<any> {
    throw new Error("read only service");
  }

  get(id: number): Observable<BaseSection> {
    return this.getOne('sections', id).pipe(map(res => plainToClass(BaseSection, res as BaseSection)));
  }

  getList(page: number, perPage: number, sort: string): Observable<ListResult<BaseSection>> {
    return this.getAll('sections', page, perPage, sort).pipe(map(res => plainToClass(SectionsListResult, res as SectionsListResult)));
  }

  update(id: number, item: any): Observable<any> {
    throw new Error("read only service");
  }

}
