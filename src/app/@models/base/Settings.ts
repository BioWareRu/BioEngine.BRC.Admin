import {Type} from 'class-transformer';

export class SettingsProperty {
  public Name: string;
  public Key: string;
  public Value: any;
  public Type: SettingType;
}

export enum SettingType {
  String = 1,
  HtmlString = 2,
  PasswordString = 3,
  Number = 4,
  Date = 5,
  DateTime = 6,
  Dropdown = 7,
  LongString = 8
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

  @Type(() => SettingsProperty)
  public Properties: SettingsProperty[] = [];
}
