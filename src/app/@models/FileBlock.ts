import { PostBlockData, PostBlock, ContentBlockItemType } from './Post';
import { Type } from 'class-transformer';
import { StorageItem } from './results/StorageItem';

export class FileBlockData extends PostBlockData {
    public File: StorageItem = new StorageItem();
}

export class FileBlock extends PostBlock<FileBlockData> {
    public Type: ContentBlockItemType = ContentBlockItemType.File;
    @Type(() => FileBlockData)
    Data: FileBlockData = new FileBlockData();
}
