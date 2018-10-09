import {ContentItem} from './ContentItem';
import {Type} from 'class-transformer';
import {StorageItem} from './results/StorageItem';

export class File extends ContentItem<FileData> {
  @Type(() => FileData)
  Data: FileData = new FileData();
}

export class FileData {
  public File: StorageItem;
  public Text: string = '';
}
