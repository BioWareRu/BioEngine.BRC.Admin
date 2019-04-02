import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { AbstractServiceWithUpload } from '@common/abstract-base-service';
import { RestClient } from '@common/HttpClient';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { SaveSiteResponse, SiteListResult } from '@models/results/Site';
import { Site } from '@models/Site';

@Injectable()
export class SitesService extends AbstractServiceWithUpload<Site> {
    constructor(httpClient: RestClient) {
        super(httpClient);
    }

    protected _getResource(): string {
        return 'sites';
    }

    protected _getListType(): ClassType<SiteListResult> {
        return SiteListResult;
    }

    protected _getSaveType(): ClassType<SaveModelResponse<Site>> {
        return SaveSiteResponse;
    }

    protected _getType(): ClassType<Site> {
        return Site;
    }
}
