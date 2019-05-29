import { Type } from '@angular/core';
import { ContentBlockItemType } from "@models/blocks/ContentBlockItemType";
import { Icon } from '../shared/icon/Icon';
export class BlockConfig {
    constructor(public type: ContentBlockItemType, public typeClass: Type<any>, public title: string, public icon: Icon, public formComponent: Type<any>) {
    }
}
