import {Injectable} from '@angular/core';
import {PostsService} from './PostsService';

@Injectable()
export class ServicesProvider {
  public constructor(private _postsService: PostsService) {

  }

  get PostsService(): PostsService {
    return this._postsService;
  }
}
