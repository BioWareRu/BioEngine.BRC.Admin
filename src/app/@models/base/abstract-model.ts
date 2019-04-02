import { Type } from 'class-transformer';
import { Properties } from './Properties';

export abstract class AbstractModel {
    public emptyId = '00000000-0000-0000-0000-000000000000';
    public id: any = undefined;
    public isPublished: boolean;
    public title: string;
    public url: string;
    public dateAdded: string;
    public dateUpdated: string;
    public datePublished: string;

    @Type(() => Properties)
    public propertiesGroups: Array<Properties> = [];
}
