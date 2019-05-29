import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { Tag } from '../Tag';

export class TagListResult extends AbstractListResult<Tag> {

  @Type(() => Tag)
  public data: Array<Tag>;
}


