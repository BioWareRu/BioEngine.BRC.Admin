import {Injectable} from '@angular/core';
import {BaseService} from '../@common/BaseService';
import {RestClient} from '../@common/HttpClient';
import {ClassType} from 'class-transformer/ClassTransformer';
import {SaveModelResponse} from '../@common/SaveModelResponse';
import {Forum} from '../@models/Forum';
import {ListResult} from '../@common/list/ListResult';
import {ForumListResult, SaveForumResponse} from '../@models/results/Forum';

@Injectable()
export class ForumsService extends BaseService<Forum> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected getListType(): ClassType<ListResult<Forum>> {
    return ForumListResult;
  }

  protected getResource(): string {
    return 'ipb/forums';
  }

  protected getType(): ClassType<Forum> {
    return Forum;
  }

  protected getSaveType(): ClassType<SaveModelResponse<Forum>> {
    return SaveForumResponse;
  }
}
