import { AbstractModel } from '../base/abstract-model';
import { AbstractBaseContentBlock } from '../blocks/AbstractBaseContentBlock';
import { IContentEntity } from '../interfaces/IContentEntity';
import { ISectionEntity } from '../interfaces/ISectionEntity';
import { ISiteEntity } from '../interfaces/ISiteEntity';
import { User } from '../User';

export class Post extends AbstractModel implements ISiteEntity, ISectionEntity, IContentEntity {
    public authorId: number;
    public author: User;
    public isPinned: boolean;
    public forumTopicId: number;
    public forumPostId: number;
    public commentsCount: number;
    public sectionIds: Array<string>;
    public siteIds: Array<string>;
    tagIds: Array<string>;

    public blocks: Array<AbstractBaseContentBlock>;

    public sections: Array<any>;
    public sites: Array<any>;
    tags: Array<any>;
}
