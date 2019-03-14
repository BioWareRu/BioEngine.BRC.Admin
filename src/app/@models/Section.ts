import { Model } from './base/Model';
import { StorageItem } from './results/StorageItem';
import { ISiteEntity } from './interfaces/ISiteEntity';

export class BaseSection extends Model implements ISiteEntity {
    public Id: string;
    public Type: SectionType;
    public ParentId: string;
    public Title: string;
    public Url: string;
    public Logo: StorageItem;
    public LogoSmall: StorageItem;
    public ShortDescription: string;
    public Hashtag: string;
    public DateAdded: string;
    public DateUpdated: string;
    public DatePublished: string;
    public IsPublished: boolean;
    public SiteIds: string[];

    public Sites: any[] = [];
}

export abstract class Section<T extends TypedData> extends BaseSection {
    public abstract Data: T;
}

export abstract class TypedData {}

export enum SectionType {
    Developer = 'BioEngine.BRC.Domain.Entities.Developer',
    Game = 'BioEngine.BRC.Domain.Entities.Game',
    Topic = 'BioEngine.BRC.Domain.Entities.Topic'
}
