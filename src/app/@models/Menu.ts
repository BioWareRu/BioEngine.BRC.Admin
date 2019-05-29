import { Type } from 'class-transformer';
import { AbstractModel } from './base/abstract-model';
import { ISingleSiteEntity } from './interfaces/ISingleSiteEntity';
import { MenuItem } from './MenuItem';

export class Menu extends AbstractModel implements ISingleSiteEntity {
    public text: string;
    public siteId: string;

    @Type(() => MenuItem)
    public items: Array<MenuItem> = [];
}
