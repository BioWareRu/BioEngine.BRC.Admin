import { ISiteEntity } from '@models/interfaces/ISiteEntity';
import { AbstractEntity } from './AbstractEntity';
export abstract class AbstractSiteEntity extends AbstractEntity implements ISiteEntity {
    public siteIds: string[];
    sites: any[];
}
