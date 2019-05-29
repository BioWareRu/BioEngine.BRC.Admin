import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { Page } from '../Page';

export class PageListResult extends AbstractListResult<Page> {

  @Type(() => Page)
  public data: Array<Page>;
}


