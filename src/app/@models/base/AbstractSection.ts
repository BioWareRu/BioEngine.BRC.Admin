import { IContentEntity } from '@models/interfaces/IContentEntity';
import { AbstractBaseContentBlock } from '@models/base/AbstractBaseContentBlock';
import { PublicUrl } from '@models/interfaces/IRoutable';
import { AbstractSiteEntity } from './AbstractSiteEntity';
export abstract class AbstractSection extends AbstractSiteEntity implements IContentEntity {
    public blocks: AbstractBaseContentBlock[];
    public isPublished: boolean;
    public datePublished: string;
    public publicUrls: PublicUrl[];
    public type: string;
}
