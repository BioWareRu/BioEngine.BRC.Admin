import {Model} from "./base/Model";
import {Site} from "./Site";
import {StorageItem} from "./results/StorageItem";

export class BaseSection extends Model {
  public Id: number;
  public Type: number;
  public ParentId: number;
  public ForumId: number;
  public Title: string;
  public Url: string;
  public Logo: StorageItem;
  public LogoSmall: StorageItem;
  public Description: string;
  public ShortDescription: string;
  public Keywords: string;
  public Hashtag: string;
  public DateAdded: string;
  public DateUpdated: string;
  public DatePublished: string;
  public IsPublished: boolean;
  public SiteIds: number[];

  public Sites: any[] = [];
}

export abstract class Section<T extends TypedData> extends BaseSection {
  public abstract Data: T;
}

export abstract class TypedData {

}
