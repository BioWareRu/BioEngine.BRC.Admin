import { StorageItem } from '../results/StorageItem';
import { AbstractContentBlockData } from "./AbstractContentBlockData";
export class GalleryBlockData extends AbstractContentBlockData {
    public pictures: Array<StorageItem> = [];
}
