import {ListResult} from '../../@common/list/ListResult';
import {SaveModelResponse} from '../../@common/SaveModelResponse';
import {Type} from 'class-transformer';
import {Forum} from '../Forum';

export class ForumListResult extends ListResult<Forum> {

  @Type(() => Forum)
  public Data: Forum[];
}

export class SaveForumResponse extends SaveModelResponse<Forum> {

}
