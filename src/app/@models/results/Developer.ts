import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { Developer } from '../Developer';

export class DeveloperListResult extends AbstractListResult<Developer> {

  @Type(() => Developer)
  public data: Array<Developer>;
}

export class SaveDeveloperResponse extends SaveModelResponse<Developer> {

}
