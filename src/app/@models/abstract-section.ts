import { AbstractModel } from './base/abstract-model';
import { ISiteEntity } from './interfaces/ISiteEntity';
import { StorageItem } from './results/StorageItem';

export class BaseSection extends AbstractModel implements ISiteEntity {
    public id: string;
    public type: SectionType;
    public parentId: string;
    public title: string;
    public url: string;
    public logo: StorageItem;
    public logoSmall: StorageItem;
    public shortDescription: string;
    public hashtag: string;
    public dateAdded: string;
    public dateUpdated: string;
    public datePublished: string;
    public isPublished: boolean;
    public siteIds: Array<string>;

    public sites: Array<any> = [];
}

export abstract class AbstractSection<T extends AbstractTypedData> extends BaseSection {
    public abstract data: T;
}

export abstract class AbstractTypedData {
}

export enum SectionType {
    Developer = 'developer',
    Game = 'game',
    Topic = 'topic'
}
