import {ISiteEntity} from "./ISiteEntity";

export interface ISectionEntity extends ISiteEntity {
  SectionIds: number[];
  TagIds: number[];
  Sections: any[];
  Tags: any[];
  Url: string;
  Title: string;
}
