import { StorageItem } from '../results/StorageItem';
import { AbstractContentBlockData } from "./AbstractContentBlockData";
export class FileBlockData extends AbstractContentBlockData {
    public file: StorageItem | null = new StorageItem();
}
