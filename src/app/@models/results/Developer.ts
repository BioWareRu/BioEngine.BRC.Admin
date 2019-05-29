import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { Developer } from '../Developer';

export class DeveloperListResult extends AbstractListResult<Developer> {

  @Type(() => Developer)
  public data: Array<Developer>;
}


