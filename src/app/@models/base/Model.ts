import {Type} from 'class-transformer';
import {Properties} from './Properties';

export abstract class Model {
  public Id: any = undefined;
  public IsPublished: boolean;
  public Title: string;
  public Url: string;

  @Type(() => Properties)
  public PropertiesGroups: Properties[] = [];
}
