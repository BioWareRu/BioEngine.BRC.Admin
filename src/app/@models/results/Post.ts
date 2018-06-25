import {ListResult} from '../../@common/list/ListResult';
import {Post} from '../Post';
import {SaveModelResponse} from '../../@common/SaveModelResponse';
import {Site} from "../Site";
import {Type} from "class-transformer";

export class PostListResult extends ListResult<Post> {

  @Type(() => Post)
  public Data: Post[];
}

export class SavePostResponse extends SaveModelResponse<Post> {

}
