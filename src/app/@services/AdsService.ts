import { Injectable } from '@angular/core';
import { Ad } from '@models/Ad';
import { AdListResult, SaveAdResponse } from '@models/results/Ad';
import { ClassType } from 'class-transformer/ClassTransformer';
import { AbstractServiceWithUpload } from '@common/abstract-base-service';
import { RestClient } from '@common/HttpClient';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';

@Injectable()
export class AdsService extends AbstractServiceWithUpload<Ad> {

    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getListType(): ClassType<AbstractListResult<Ad>> {
        return AdListResult;
    }

    protected _getSaveType(): ClassType<SaveModelResponse<Ad>> {
        return SaveAdResponse;
    }

    protected _getType(): ClassType<Ad> {
        return Ad;
    }

    protected _getResource(): string {
        return 'ads';
    }
}
