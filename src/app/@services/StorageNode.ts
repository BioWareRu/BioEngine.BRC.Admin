import { StorageItem } from '@models/results/StorageItem';
export class StorageNode {
    public name: string;
    public path: string;
    public isDirectory: boolean;
    public selected: boolean;
    public item: StorageItem;
    public items: Array<StorageNode>;
}
