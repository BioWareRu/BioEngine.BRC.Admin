import { StorageItem } from '../results/StorageItem';
import { AbstractContentBlockData } from '../base/AbstractContentBlockData';
export class GalleryBlockData extends AbstractContentBlockData {
    public pictures: Array<StorageItem> = [];
}
