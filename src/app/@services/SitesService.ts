import { BaseServiceWithUpload } from '../@common/BaseService';
import { Site } from '../@models/Site';
import { SaveSiteResponse, SiteListResult } from '../@models/results/Site';
import { Injectable } from '@angular/core';
import { RestClient } from '../@common/HttpClient';
import { ClassType } from 'class-transformer/ClassTransformer';
import { SaveModelResponse } from '../@common/SaveModelResponse';

@Injectable()
export class SitesService extends BaseServiceWithUpload<Site> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected getResource(): string {
        return 'sites';
    }

    protected getListType(): ClassType<SiteListResult> {
        return SiteListResult;
    }

    protected getSaveType(): ClassType<SaveModelResponse<Site>> {
        return SaveSiteResponse;
    }

    protected getType(): ClassType<Site> {
        return Site;
    }
}
