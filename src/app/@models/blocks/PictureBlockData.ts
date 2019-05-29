import { StorageItem } from '../results/StorageItem';
import { AbstractContentBlockData } from "./AbstractContentBlockData";
export class PictureBlockData extends AbstractContentBlockData {
    public picture: StorageItem | null = null;
    public url: string;
}
