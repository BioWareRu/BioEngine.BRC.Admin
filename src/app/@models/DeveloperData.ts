import { AbstractTypedData } from './AbstractTypedData';
import { Person } from './Person';
export class DeveloperData extends AbstractTypedData {
  public persons: Array<Person>;
}
