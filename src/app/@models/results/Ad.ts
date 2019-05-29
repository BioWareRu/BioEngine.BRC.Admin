import { Ad } from '@models/Ad';
import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';

export class AdListResult extends AbstractListResult<Ad> {

    @Type(() => Ad)
    public data: Array<Ad>;
}


