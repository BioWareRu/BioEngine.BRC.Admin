import { Type } from 'class-transformer';
import { AbstractSection, AbstractTypedData } from './abstract-section';

export class DeveloperData extends AbstractTypedData {
  @Type(() => Person)
  public persons: Array<Person>;
}

export class Developer extends AbstractSection<DeveloperData> {
  data: DeveloperData;
}

export class Person {
  public name: string;
  public position: string;
  public dateStart: string;
  public dateEnd: string;
}
