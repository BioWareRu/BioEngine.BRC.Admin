import {BaseService} from "../@common/BaseService";
import {Site} from "../@models/Site";
import {Observable} from "rxjs/Observable";
import {ListResult} from "../@common/list/ListResult";
import {plainToClass} from "class-transformer";
import {map} from "rxjs/operators";
import {SaveSiteResponse, SiteListResult} from "../@models/results/Site";
import {Injectable} from "@angular/core";
import {RestClient} from "../@common/HttpClient";

@Injectable()
export class SitesService extends BaseService<Site> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  add(item: any): Observable<SaveSiteResponse> {
    return this.doAdd('sites', item).pipe(map(res => plainToClass(SaveSiteResponse, res as SaveSiteResponse)));
  }

  delete(id: number): Observable<boolean> {
    return this.doDelete('sites', id).pipe(map(res => true));
  }

  get(id: number): Observable<Site> {
    return this.getOne('sites', id).pipe(map(res => plainToClass(Site, res as Site)));
  }

  getList(page: number, perPage: number, sort: string): Observable<ListResult<Site>> {
    return this.getAll('sites', page, perPage, sort).pipe(map(res => plainToClass(SiteListResult, res as SiteListResult)));
  }

  update(id: number, item: any): Observable<SaveSiteResponse> {
    return this.doUpdate('sites', id, item).pipe(map(res => plainToClass(SaveSiteResponse, res as SaveSiteResponse)));
  }

}
