import { AbstractModel } from '../base/abstract-model';

export interface ISiteEntity extends AbstractModel {
    siteIds: Array<string>;
    sites: Array<any>;
}

export interface ISingleSiteEntity extends AbstractModel {
    siteId: string;
}
