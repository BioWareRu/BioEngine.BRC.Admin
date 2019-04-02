import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { Forum } from '../Forum';

export class ForumListResult extends AbstractListResult<Forum> {

  @Type(() => Forum)
  public data: Array<Forum>;
}

export class SaveForumResponse extends SaveModelResponse<Forum> {

}
