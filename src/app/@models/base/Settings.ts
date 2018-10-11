import {Type} from 'class-transformer';

export class SettingsPropertyValue {
  public SiteId: number;
  public Value: any;
}

export class SettingsProperty {
  public Name: string;
  public Key: string;
  public Values: SettingsPropertyValue[];
  public Type: SettingType;
  public IsRequired: boolean;
}

export enum SettingType {
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

export enum SettingMode {
  OnePerEntity = 1,
  OnePerSite = 2
}

export class SettingsOption {
  public Title: string;
  public Value: any;
  public Group: string;
}

export class Settings {
  public Name: string;
  public Key: string;
  public IsEditable: boolean;
  public Mode: SettingMode;

  @Type(() => SettingsProperty)
  public Properties: SettingsProperty[] = [];
}
