import {Type} from 'class-transformer';
import {Settings} from './Settings';

export abstract class Model {
  public Id: any = undefined;
  public IsPublished: boolean;
  public Title: string;
  public Url: string;

  @Type(() => Settings)
  public SettingsGroups: Settings[] = [];
}
