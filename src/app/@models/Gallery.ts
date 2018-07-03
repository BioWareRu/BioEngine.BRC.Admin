import {ContentItem} from "./ContentItem";
import {Type} from "class-transformer";
import {StorageItem} from "./results/StorageItem";

export class Gallery extends ContentItem<GalleryData> {
  @Type(() => GalleryData)
  Data: GalleryData = new GalleryData();
}

export class GalleryData {
  public Text: string = '';
  public Pictures: StorageItem[] = [];
}
