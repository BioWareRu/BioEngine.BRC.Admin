import { AbstractSiteEntity } from '@models/base/AbstractSiteEntity';
import { AbstractBaseContentBlock } from '@models/base/AbstractBaseContentBlock';
import { IContentEntity } from '@models/interfaces/IContentEntity';
import { PublicUrl } from '@models/interfaces/IRoutable';

export class Ad extends AbstractSiteEntity implements IContentEntity {
    public blocks: AbstractBaseContentBlock[];
    public datePublished: string;
    public isPublished: boolean;
    public publicUrls: PublicUrl[];
}
