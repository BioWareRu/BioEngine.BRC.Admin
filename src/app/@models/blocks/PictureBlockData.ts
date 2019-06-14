import { StorageItem } from '../results/StorageItem';
import { AbstractContentBlockData } from '../base/AbstractContentBlockData';
export class PictureBlockData extends AbstractContentBlockData {
    public picture: StorageItem | null = null;
    public url: string;
}
