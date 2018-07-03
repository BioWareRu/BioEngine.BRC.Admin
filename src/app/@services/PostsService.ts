import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Post} from '../@models/Post';
import {BaseService} from '../@common/BaseService';
import {RestClient} from '../@common/HttpClient';
import {PostListResult, SavePostResponse} from '../@models/results/Post';
import {map} from 'rxjs/operators';
import {ClassType} from "class-transformer/ClassTransformer";
import {SaveModelResponse} from "../@common/SaveModelResponse";

@Injectable()
export class PostsService extends BaseService<Post> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  public pin(id: number): Observable<boolean> {
    return this.httpClient.put('posts/' + id + '/pin', {}).pipe(map(() => true));
  }

  public unpin(id: number): Observable<boolean> {
    return this.httpClient.put('posts/' + id + '/unpin', {}).pipe(map(() => false));
  }

  protected getListType(): ClassType<PostListResult> {
    return PostListResult;
  }

  protected getResource(): string {
    return "posts";
  }

  protected getType(): ClassType<Post> {
    return Post;
  }

  protected getSaveType(): ClassType<SaveModelResponse<Post>> {
    return SavePostResponse;
  }
}
