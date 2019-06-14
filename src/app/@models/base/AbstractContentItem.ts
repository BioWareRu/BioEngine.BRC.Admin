import { IContentEntity } from '@models/interfaces/IContentEntity';
import { PublicUrl } from '@models/interfaces/IRoutable';
import { ISectionEntity } from '@models/interfaces/ISectionEntity';
import { AbstractBaseContentBlock } from '@models/base/AbstractBaseContentBlock';
import { AbstractEntity } from './AbstractEntity';
import { User } from '@models/User';
export abstract class AbstractContentItem extends AbstractEntity implements IContentEntity, ISectionEntity {
    public sectionIds: string[];
    public tagIds: string[];
    public sections: any[];
    public tags: any[];
    public blocks: AbstractBaseContentBlock[];
    public isPublished: boolean;
    public datePublished: string;
    public siteIds: string[];
    public sites: any[];
    public publicUrls: PublicUrl[];
    public authorId: number;
    public author: User;
}
