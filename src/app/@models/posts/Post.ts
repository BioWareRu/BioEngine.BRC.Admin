import { Model } from '../base/Model';
import { ISiteEntity } from '../interfaces/ISiteEntity';
import { ISectionEntity } from '../interfaces/ISectionEntity';
import { User } from '../User';
import { BaseContentBlock } from '../blocks/ContentBlock';
import { IContentEntity } from '../interfaces/IContentEntity';
import { Type } from 'class-transformer';

export class Post extends Model implements ISiteEntity, ISectionEntity, IContentEntity {
    public Id = '';
    public AuthorId: number;
    public Author: User;
    public Url: string;
    public DateAdded: string;
    public DateUpdated: string;
    public DatePublished: string;
    public IsPinned: boolean;
    public ForumTopicId: number;
    public ForumPostId: number;
    public CommentsCount: number;
    public SectionIds: string[];
    public SiteIds: string[];
    TagIds: string[];

    @Type(() => BaseContentBlock)
    public Blocks: BaseContentBlock[];

    public Sections: any[];
    public Sites: any[];
    Tags: any[];
}
