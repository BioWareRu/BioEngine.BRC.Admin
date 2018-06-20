import {ListResult} from '../../@common/list/ListResult';
import {Post} from '../Post';
import {SaveModelResponse} from '../../@common/SaveModelResponse';

export class PostListResult extends ListResult<Post> {

  public data: Post[];

  constructor() {
    super();
    this.data = undefined;
  }
}

export class SavePostResponse extends SaveModelResponse<Post> {

}
