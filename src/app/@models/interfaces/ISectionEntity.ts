import { ISiteEntity } from './ISiteEntity';

export interface ISectionEntity extends ISiteEntity {
    sectionIds: Array<string>;
    tagIds: Array<string>;
    sections: Array<any>;
    tags: Array<any>;
    url: string;
    title: string;
}
