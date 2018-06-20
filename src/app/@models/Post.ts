import {Model} from './base/Model';
import {ContentData, ContentItem} from './ContentItem';

export class Post extends ContentItem<PostData> {

}

export class PostData extends ContentData {
  public MainText: string;
  public ExtendedText: string;
}
