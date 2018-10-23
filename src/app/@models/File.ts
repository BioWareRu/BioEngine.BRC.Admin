import {ContentItem} from './ContentItem';
import {Type} from 'class-transformer';
import {StorageItem} from './results/StorageItem';

export class FileData {
  public File: StorageItem;
  public Text = '';
}

export class File extends ContentItem<FileData> {
  @Type(() => FileData)
  Data: FileData = new FileData();
}
