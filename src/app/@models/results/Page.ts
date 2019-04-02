import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { Page } from '../Page';

export class PageListResult extends AbstractListResult<Page> {

  @Type(() => Page)
  public data: Array<Page>;
}

export class SavePageResponse extends SaveModelResponse<Page> {

}
