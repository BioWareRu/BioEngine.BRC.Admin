import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { AbstractServiceWithUpload } from '@common/AbstractServiceWithUpload';
import { RestClient } from '@common/HttpClient';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { TopicListResult } from '@models/results/Topic';
import { SaveTopicResponse } from '@models/results/SaveTopicResponse';
import { Topic } from '@models/Topic';

@Injectable()
export class TopicsService extends AbstractServiceWithUpload<Topic> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected _getListType(): ClassType<AbstractListResult<Topic>> {
    return TopicListResult;
  }

  protected _getResource(): string {
    return 'topics';
  }

  protected _getSaveType(): ClassType<SaveModelResponse<Topic>> {
    return SaveTopicResponse;
  }

  protected _getType(): ClassType<Topic> {
    return Topic;
  }
}
