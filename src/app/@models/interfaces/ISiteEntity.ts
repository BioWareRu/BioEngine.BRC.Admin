import { Model } from '../base/Model';

export interface ISiteEntity extends Model {
    SiteIds: string[];
    Sites: any[];
}

export interface ISingleSiteEntity extends Model {
    SiteId: string;
}
