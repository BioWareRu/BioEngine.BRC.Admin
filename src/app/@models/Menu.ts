import { MenuItem } from './MenuItem';
import { AbstractSiteEntity } from './base/AbstractSiteEntity';

export class Menu extends AbstractSiteEntity {
    public items: Array<MenuItem> = [];
}
