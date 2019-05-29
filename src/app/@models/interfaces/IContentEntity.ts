import { AbstractBaseContentBlock } from "../blocks/AbstractBaseContentBlock";
import { ISiteEntity } from './ISiteEntity';

export interface IContentEntity extends ISiteEntity {
    blocks: Array<AbstractBaseContentBlock>;
}
