import {Model} from './base/Model';

export class Tag extends Model {
    public Name: string;

    public get Title(): string {
        return this.Name;
    }
}
