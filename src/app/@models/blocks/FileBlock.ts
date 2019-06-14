import { Icon } from '@common/shared/icon/Icon';
import { AbstractContentBlock } from './abstract-content-block';
import { ContentBlockItemType } from './ContentBlockItemType';
import { FileBlockData } from './FileBlockData';

export class FileBlock extends AbstractContentBlock<FileBlockData> {
    public title = 'Файл';
    public icon = new Icon('fa-file-alt');
    public type: ContentBlockItemType = ContentBlockItemType.File;
    data: FileBlockData = new FileBlockData();


    static isEmpty(block: FileBlock): boolean {
        return !block.data.file || block.data.file.fileSize < 1;
    }
}
