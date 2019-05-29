import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { AbstractBaseService } from '@common/abstract-base-service';
import { RestClient } from '@common/HttpClient';
import { AbstractListResult } from '@common/list/abstract-list-result';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { SectionsListResult } from '@models/results/BaseSection';
import { BaseSection } from "@models/BaseSection";

@Injectable()
export class SectionsService extends AbstractBaseService<BaseSection> {

    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'sections';
    }

    protected _getListType(): ClassType<AbstractListResult<BaseSection>> {
        return SectionsListResult;
    }

    protected _getSaveType(): ClassType<SaveModelResponse<BaseSection>> {
        throw new Error('Not implemented');
    }

    protected _getType(): ClassType<BaseSection> {
        return BaseSection;
    }

}
