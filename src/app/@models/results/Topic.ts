import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { Topic } from '../Topic';

export class TopicListResult extends AbstractListResult<Topic> {

  @Type(() => Topic)
  public data: Array<Topic>;
}

export class SaveTopicResponse extends SaveModelResponse<Topic> {

}
