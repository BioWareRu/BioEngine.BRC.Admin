import { Icon } from '@common/shared/icon/Icon';
import { Type } from 'class-transformer';
import { StorageItem } from '../results/StorageItem';
import { AbstractContentBlock, AbstractContentBlockData, ContentBlockItemType } from './abstract-content-block';

export class FileBlockData extends AbstractContentBlockData {
    public file: StorageItem | null = new StorageItem();
}

export class FileBlock extends AbstractContentBlock<FileBlockData> {
    public title = 'Файл';
    public icon = new Icon('fa-file-alt');
    public type: ContentBlockItemType = ContentBlockItemType.File;
    @Type(() => FileBlockData)
    data: FileBlockData = new FileBlockData();


    static isEmpty(block: FileBlock): boolean {
        return !block.data.file || block.data.file.fileSize < 1;
    }
}
