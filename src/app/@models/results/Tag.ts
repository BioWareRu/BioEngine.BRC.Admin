import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { Tag } from '../Tag';

export class TagListResult extends AbstractListResult<Tag> {

  @Type(() => Tag)
  public data: Array<Tag>;
}

export class SaveTagResponse extends SaveModelResponse<Tag> {

}
