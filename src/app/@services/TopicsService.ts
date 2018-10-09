import {Injectable} from '@angular/core';
import {BaseServiceWithUpload} from '../@common/BaseService';
import {Topic} from '../@models/Topic';
import {RestClient} from '../@common/HttpClient';
import {ListResult} from '../@common/list/ListResult';
import {SaveTopicResponse, TopicListResult} from '../@models/results/Topic';
import {ClassType} from 'class-transformer/ClassTransformer';
import {SaveModelResponse} from '../@common/SaveModelResponse';

@Injectable()
export class TopicsService extends BaseServiceWithUpload<Topic> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  protected getListType(): ClassType<ListResult<Topic>> {
    return TopicListResult;
  }

  protected getResource(): string {
    return "topics";
  }

  protected getSaveType(): ClassType<SaveModelResponse<Topic>> {
    return SaveTopicResponse;
  }

  protected getType(): ClassType<Topic> {
    return Topic;
  }
}
