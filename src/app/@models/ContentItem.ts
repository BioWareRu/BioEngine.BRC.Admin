import {Model} from './base/Model';

export abstract class ContentItem<T extends ContentData> extends Model {
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

  public abstract Data: T;
}

export enum ContentItemType {
  Post = 1,
  File = 2,
  Gallery = 3
}

export class ContentData {

}
