import {ISiteEntity} from './interfaces/ISiteEntity';
import {Model} from './base/Model';

export class Page extends Model implements ISiteEntity {
  public Id: number;
  public Title: string;
  public Url: string;
  public Text: string;
  public SiteIds: number[];
  public Sites: any[];
}
