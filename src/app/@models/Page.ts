import { ISiteEntity } from './interfaces/ISiteEntity';
import { Model } from './base/Model';

export class Page extends Model implements ISiteEntity {
    public Id: string;
    public Title: string;
    public Url: string;
    public Text: string;
    public SiteIds: string[];
    public Sites: any[];
}
