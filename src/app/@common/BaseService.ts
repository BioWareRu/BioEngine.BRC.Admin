import {Observable} from 'rxjs/Rx';
import {RestClient} from './HttpClient';
import {ListResult} from './list/ListResult';
import {plainToClass} from "class-transformer";
import {map} from "rxjs/operators";
import {SaveModelResponse} from "./SaveModelResponse";
import {ClassType} from "class-transformer/ClassTransformer";

export abstract class BaseService<T> {

  constructor(protected httpClient: RestClient) {
  }

  protected abstract getResource(): string;

  protected abstract getListType(): ClassType<ListResult<T>>;

  protected abstract getSaveType(): ClassType<SaveModelResponse<T>>;

  protected abstract getType(): ClassType<T>;

  public getAll(page: number, perPage: number, sort): Observable<ListResult<T>> {
    return this.httpClient.get(this.getResource(), {
      limit: perPage,
      offset: perPage * (page - 1),
      order: sort
    }).pipe(map(res => plainToClass(this.getListType(), res as ListResult<T>)));
  }

  public get(id: number): Observable<T> {
    return this.httpClient.get(this.getResource() + '/' + id, {})
      .pipe(map(res => plainToClass(this.getType(), res as T)));
  }

  public add(item: any): Observable<SaveModelResponse<T>> {
    return this.httpClient.post(this.getResource(), item).pipe(map(res => plainToClass(this.getSaveType(), res as SaveModelResponse<T>)));
  }

  public update(id: number, item: any): Observable<SaveModelResponse<T>> {
    return this.httpClient.put(this.getResource() + '/' + id, item).pipe(map(res => plainToClass(this.getSaveType(), res as SaveModelResponse<T>)));
  }

  public delete(id: number): Observable<boolean> {
    return this.httpClient.delete(this.getResource() + '/' + id).pipe(map(() => true));
  }

  public count(): Observable<number> {
    return this.httpClient.get(this.getResource() + '/count', {}).pipe(map(res => res as number));
  }
}
