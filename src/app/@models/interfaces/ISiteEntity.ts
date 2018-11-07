import { Model } from '../base/Model';

export interface ISiteEntity extends Model {
    SiteIds: number[];
    Sites: any[];
}

export interface ISingleSiteEntity extends Model {
    SiteId: number;
}
