import { AbstractSectionData, StorageItem } from 'bioengine-angular';

export abstract class AbstractBrcSectionData extends AbstractSectionData {
    headerPicture: StorageItem;
    hashtag: string;
}
