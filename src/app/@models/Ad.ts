import { AbstractModel } from '@models/base/abstract-model';
import { ISiteEntity } from '@models/interfaces/ISiteEntity';
import { StorageItem } from '@models/results/StorageItem';

export class Ad extends AbstractModel implements ISiteEntity {
    public picture: StorageItem;
    public siteIds: Array<string>;
    public sites: Array<any>;
}
