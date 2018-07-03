import {Section, TypedData} from "./Section";
import {Type} from "class-transformer";

export class DeveloperData extends TypedData {
  @Type(() => Person)
  public Persons: Person[];
}

export class Developer extends Section<DeveloperData> {
  Data: DeveloperData;

  public Test()
  {
    return "bla";
  }
}

export class Person {
  public Name: string;
  public Position: string;
  public DateStart: string;
  public DateEnd: string;
}
