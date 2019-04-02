import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { BaseSection } from '../abstract-section';

export class SectionsListResult extends AbstractListResult<BaseSection> {

  @Type(() => BaseSection)
  public data: Array<BaseSection>;
}
