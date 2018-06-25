import {ContentData, ContentItem} from './ContentItem';
import {Type} from "class-transformer";

export class Post extends ContentItem<PostData> {

  @Type(() => PostData)
  Data: PostData;
}

export class PostData extends ContentData {
  public MainText: string;
  public ExtendedText: string;
}
