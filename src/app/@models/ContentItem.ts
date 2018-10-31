import {Model} from './base/Model';
import {ISiteEntity} from './interfaces/ISiteEntity';
import {ISectionEntity} from './interfaces/ISectionEntity';
import {User} from './User';

export class BaseContentItem extends Model implements ISiteEntity, ISectionEntity {
  public Id: number;
  public Type: ContentItemType;
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
  public SectionIds: number[];
  public SiteIds: number[];
  TagIds: number[];

  public Sections: any[];
  public Sites: any[];
  Tags: any[];
}

export abstract class ContentItem<T extends ContentData> extends BaseContentItem {
  public abstract Data: T;
}

export enum ContentItemType {
  Post = 'BioEngine.BRC.Domain.Entities.Post',
  File = 'BioEngine.BRC.Domain.Entities.File',
  Gallery = 'BioEngine.BRC.Domain.Entities.Gallery'
}

export class ContentData {

}
