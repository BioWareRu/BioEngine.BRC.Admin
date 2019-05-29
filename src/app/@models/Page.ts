import { AbstractModel } from './base/abstract-model';
import { AbstractBaseContentBlock } from './blocks/AbstractBaseContentBlock';
import { IContentEntity } from './interfaces/IContentEntity';
import { ISiteEntity } from './interfaces/ISiteEntity';

export class Page extends AbstractModel implements ISiteEntity, IContentEntity {
    public siteIds: Array<string>;
    public sites: Array<any>;

    blocks: Array<AbstractBaseContentBlock> = [];
}
