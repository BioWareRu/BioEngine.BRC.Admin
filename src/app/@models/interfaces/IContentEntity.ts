import { AbstractBaseContentBlock } from '../blocks/abstract-content-block';
import { ISiteEntity } from './ISiteEntity';

export interface IContentEntity extends ISiteEntity {
    blocks: Array<AbstractBaseContentBlock>;
}
