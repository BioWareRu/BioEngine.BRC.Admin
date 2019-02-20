import { PostBlockData, PostBlock, ContentBlockItemType } from './Post';
import { Type } from 'class-transformer';
import { StorageItem } from '../results/StorageItem';
import { Icon } from 'app/@common/shared/icon/Icon';

export class FileBlockData extends PostBlockData {
    public File: StorageItem = new StorageItem();
}

export class FileBlock extends PostBlock<FileBlockData> {
    public Title = 'Файл';
    public Icon = new Icon('fa-file-alt');
    public Type: ContentBlockItemType = ContentBlockItemType.File;
    @Type(() => FileBlockData)
    Data: FileBlockData = new FileBlockData();
}
