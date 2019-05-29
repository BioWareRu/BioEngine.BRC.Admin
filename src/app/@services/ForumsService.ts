import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { AbstractBaseService } from '@common/abstract-base-service';
import { RestClient } from '@common/HttpClient';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { Forum } from '@models/Forum';
import { ForumListResult } from '@models/results/Forum';
import { SaveForumResponse } from "@models/results/SaveForumResponse";

@Injectable()
export class ForumsService extends AbstractBaseService<Forum> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected _getListType(): ClassType<AbstractListResult<Forum>> {
    return ForumListResult;
  }

  protected _getResource(): string {
    return 'ipb/forums';
  }

  protected _getType(): ClassType<Forum> {
    return Forum;
  }

  protected _getSaveType(): ClassType<SaveModelResponse<Forum>> {
    return SaveForumResponse;
  }
}
