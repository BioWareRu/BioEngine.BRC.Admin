import { BaseContentBlock } from '../blocks/ContentBlock';
import { ISiteEntity } from './ISiteEntity';

export interface IContentEntity extends ISiteEntity {
    Blocks: BaseContentBlock[];
}
