import {ContentData, ContentItem} from './ContentItem';
import {Type} from "class-transformer";

export class Post extends ContentItem<PostData> {

  @Type(() => PostData)
  Data: PostData = new PostData();
}

export class PostData extends ContentData {
  public Text: string = '';
}
