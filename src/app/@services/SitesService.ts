import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { AbstractServiceWithUpload } from "@common/AbstractServiceWithUpload";
import { RestClient } from '@common/HttpClient';
import { SaveModelResponse } from '@common/SaveModelResponse';
import { SiteListResult } from '@models/results/Site';
import { SaveSiteResponse } from "@models/results/SaveSiteResponse";
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
