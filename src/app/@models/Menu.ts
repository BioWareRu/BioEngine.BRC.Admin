import {Model} from './base/Model';
import {ISiteEntity} from './interfaces/ISiteEntity';
import {Type} from 'class-transformer';

export class MenuItem {
  public Label: string;
  public Url: string;
  @Type(() => MenuItem)
  public Items: MenuItem[] = [];
}

export class Menu extends Model implements ISiteEntity {
  public Id: number;
  public Title: string;
  public Url: string;
  public Text: string;
  public SiteIds: number[];
  public Sites: any[];

  @Type(() => MenuItem)
  public Items: MenuItem[] = [];
}


