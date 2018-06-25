import {Injectable} from "@angular/core";
import {BaseService} from "../@common/BaseService";
import {Topic} from "../@models/Topic";
import {RestClient} from "../@common/HttpClient";
import {Observable} from "rxjs/Observable";
import {ListResult} from "../@common/list/ListResult";
import {map} from "rxjs/operators";
import {plainToClass} from "class-transformer";
import {TopicListResult, SaveTopicResponse} from "../@models/results/Topic";

@Injectable()
export class TopicsService extends BaseService<Topic> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  add(item: any): Observable<any> {
    return this.doAdd('topics', item).pipe(map(res => plainToClass(SaveTopicResponse, res as SaveTopicResponse)));
  }

  delete(id: number): Observable<any> {
    return this.doDelete('topics', id).pipe(map(res => true));
  }

  get(id: number): Observable<Topic> {
    return this.getOne('topics', id).pipe(map(res => plainToClass(Topic, res as Topic)));
  }

  getList(page: number, perPage: number, sort: string): Observable<ListResult<Topic>> {
    return this.getAll('topics', page, perPage, sort).pipe(map(res => plainToClass(TopicListResult, res as TopicListResult)));
  }

  update(id: number, item: any): Observable<any> {
    return this.doUpdate('topics', id, item).pipe(map(res => plainToClass(SaveTopicResponse, res as SaveTopicResponse)));
  }

}
