import { Type } from 'class-transformer';
import { AbstractTypedData } from './AbstractTypedData';
import { Person } from './Person';
export class DeveloperData extends AbstractTypedData {
  @Type(() => Person)
  public persons: Array<Person>;
}
