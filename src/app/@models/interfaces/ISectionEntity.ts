import { ISiteEntity } from './ISiteEntity';

export interface ISectionEntity extends ISiteEntity {
    SectionIds: string[];
    TagIds: string[];
    Sections: any[];
    Tags: any[];
    Url: string;
    Title: string;
}
