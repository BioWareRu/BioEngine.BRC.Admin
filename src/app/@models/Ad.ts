import { AbstractBaseContentBlock, AbstractSiteEntity, IContentEntity, PublicUrl } from 'bioengine-angular';

export class Ad extends AbstractSiteEntity implements IContentEntity {
    public blocks: AbstractBaseContentBlock[];
    public datePublished: string;
    public isPublished: boolean;
    public publicUrls: PublicUrl[];
}
