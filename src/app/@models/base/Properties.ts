import {Type} from 'class-transformer';

export class PropertiesElementValue {
  public SiteId: number;
  public Value: any;
}

export class PropertiesElement {
  public Name: string;
  public Key: string;
  public Values: PropertiesElementValue[];
  public Type: PropertiesElementType;
  public IsRequired: boolean;
}

export enum PropertiesElementType {
  String = 1,
  HtmlString = 2,
  PasswordString = 3,
  Number = 4,
  Date = 5,
  DateTime = 6,
  Dropdown = 7,
  LongString = 8,
  Checkbox = 9,
  Url = 10
}

export enum PropertiesFrequency {
  OnePerEntity = 1,
  OnePerSite = 2
}

export class PropertiesOption {
  public Title: string;
  public Value: any;
  public Group: string;
}

export class Properties {
  public Name: string;
  public Key: string;
  public IsEditable: boolean;
  public Frequency: PropertiesFrequency;

  @Type(() => PropertiesElement)
  public Properties: PropertiesElement[] = [];
}
