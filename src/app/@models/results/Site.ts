import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { Site } from '../Site';

export class SiteListResult extends AbstractListResult<Site> {

  @Type(() => Site)
  public data: Array<Site>;
}

export class SaveSiteResponse extends SaveModelResponse<Site> {

}
