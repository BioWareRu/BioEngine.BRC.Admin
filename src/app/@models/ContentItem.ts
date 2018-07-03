import {Model} from './base/Model';
import {ISiteEntity} from "./interfaces/ISiteEntity";
import {ISectionEntity} from "./interfaces/ISectionEntity";

export class BaseContentItem extends Model implements ISiteEntity, ISectionEntity {
  public Id: number;
  public Type: ContentItemType;
  public AuthorId: number;
  public Title: string;
  public Url: string;
  public Description: string;
  public DateAdded: string;
  public DateUpdated: string;
  public DatePublished: string;
  public IsPublished: boolean;
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
  Post = 1,
  File = 2,
  Gallery = 3
}

export class ContentData {

}
