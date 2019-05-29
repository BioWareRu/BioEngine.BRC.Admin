import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { Site } from '../Site';

export class SiteListResult extends AbstractListResult<Site> {

  @Type(() => Site)
  public data: Array<Site>;
}


