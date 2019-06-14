import { Properties } from '../Properties';
import { IEntity } from '@models/interfaces/IEntity';
export abstract class AbstractEntity implements IEntity {
    public id: any = undefined;
    public title: string;
    public url: string;
    public dateAdded: string;
    public dateUpdated: string;
    public propertiesGroups: Array<Properties> = [];
}
