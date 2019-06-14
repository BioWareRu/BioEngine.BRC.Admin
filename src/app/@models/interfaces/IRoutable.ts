import { Site } from '@models/Site';
import { IEntity } from './IEntity';

export class PublicUrl {
    url: string;
    site: Site;
}

export interface IRoutable extends IEntity {
    publicUrls: PublicUrl[];
}
