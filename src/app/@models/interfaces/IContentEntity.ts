import { AbstractBaseContentBlock } from '../base/AbstractBaseContentBlock';
import { ISiteEntity } from './ISiteEntity';
import { IRoutable } from './IRoutable';

export interface IContentEntity extends ISiteEntity, IRoutable {
    blocks: AbstractBaseContentBlock[];
    isPublished: boolean;
    datePublished: string;
}
