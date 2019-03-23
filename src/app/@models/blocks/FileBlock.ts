import { Type } from 'class-transformer';
import { StorageItem } from '../results/StorageItem';
import { Icon } from 'app/@common/shared/icon/Icon';
import { ContentBlockData, ContentBlock, ContentBlockItemType } from './ContentBlock';

export class FileBlockData extends ContentBlockData {
    public File: StorageItem = new StorageItem();
}

export class FileBlock extends ContentBlock<FileBlockData> {
    public Title = 'Файл';
    public Icon = new Icon('fa-file-alt');
    public Type: ContentBlockItemType = ContentBlockItemType.File;
    @Type(() => FileBlockData)
    Data: FileBlockData = new FileBlockData();
    static IsEmpty(block: FileBlock): boolean {
        return !block.Data.File;
    }
}
