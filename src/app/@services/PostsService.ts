import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Post} from '../@models/Post';
import {BaseService} from '../@common/BaseService';
import {RestClient} from '../@common/HttpClient';
import {PostListResult, SavePostResponse} from '../@models/results/Post';
import {plainToClass} from 'class-transformer';
import {map} from 'rxjs/operators';

@Injectable()
export class PostsService extends BaseService<Post> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  public getList(page: number = 1, perPage: number = 20, sort: string = '-id'): Observable<PostListResult> {
    return this.getAll('posts', page, perPage, sort).pipe(map(res => plainToClass(PostListResult, res)));
  }

  public get(id: number): Observable<Post> {
    return this.getOne('posts', id).pipe(map(res => plainToClass(Post, res)));
  }

  public add(item: Post): Observable<SavePostResponse> {
    return this.doAdd('posts', item).pipe(map(res => plainToClass(SavePostResponse, res)));
  }

  public update(id: number, item: Post): Observable<SavePostResponse> {
    return this.doUpdate('posts', id, item).pipe(map(res => plainToClass(SavePostResponse, res)));
  }

  public delete(id: number): Observable<boolean> {
    return this.doDelete('posts', id).pipe(map(res => true));
  }

  public publish(id: number): Observable<boolean> {
    return this.httpClient.put('posts/' + id + '/publish', {}).pipe(map(res => true));
  }

  public unpublish(id: number): Observable<boolean> {
    return this.httpClient.put('posts/' + id + '/unpublish', {}).pipe(map(res => false));
  }

  public pin(id: number): Observable<boolean> {
    return this.httpClient.put('posts/' + id + '/pin', {}).pipe(map(res => true));
  }

  public unpin(id: number): Observable<boolean> {
    return this.httpClient.put('posts/' + id + '/unpin', {}).pipe(map(res => false));
  }
}
