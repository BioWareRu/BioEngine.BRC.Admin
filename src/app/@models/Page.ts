import { ISiteEntity } from './interfaces/ISiteEntity';
import { Model } from './base/Model';
import { IContentEntity } from './interfaces/IContentEntity';
import { BaseContentBlock } from './blocks/ContentBlock';

export class Page extends Model implements ISiteEntity, IContentEntity {
    public Id: string;
    public Title: string;
    public Url: string;
    public SiteIds: string[];
    public Sites: any[];

    Blocks: BaseContentBlock[] = [];
}
