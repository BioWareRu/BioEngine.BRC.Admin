import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { Topic } from '../Topic';

export class TopicListResult extends AbstractListResult<Topic> {

  @Type(() => Topic)
  public data: Array<Topic>;
}


