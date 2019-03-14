import { Type } from 'class-transformer';
import { Properties } from './Properties';

export abstract class Model {
    public EmptyId = '00000000-0000-0000-0000-000000000000';
    public Id: any = undefined;
    public IsPublished: boolean;
    public Title: string;
    public Url: string;

    @Type(() => Properties)
    public PropertiesGroups: Properties[] = [];
}
