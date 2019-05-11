import { Ad } from '@models/Ad';
import { Type } from 'class-transformer';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';

export class AdListResult extends AbstractListResult<Ad> {

    @Type(() => Ad)
    public data: Array<Ad>;
}

export class SaveAdResponse extends SaveModelResponse<Ad> {

}
