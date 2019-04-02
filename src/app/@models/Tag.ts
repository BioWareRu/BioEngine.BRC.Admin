import { AbstractModel } from './base/abstract-model';

export class Tag extends AbstractModel {
    public name: string;

    public get title(): string {
        return this.name;
    }
}
