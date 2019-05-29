import { Component } from '@angular/core';
import { AbstractBaseService } from '@common/abstract-base-service';
import { AbstractFormPageComponent } from "@common/forms/AbstractFormPageComponent";
import { PageContext } from "@common/PageContext";
import { SaveSiteResponse } from "@models/results/SaveSiteResponse";
import { Site } from '@models/Site';
import { SitesService } from '@services/SitesService';

@Component({
    selector: 'site-form-page',
    template: `
        <site-form class="model-form" #modelForm [model]="model"></site-form>
    `,
    providers: [PageContext]
})
export class SiteFormPageComponent extends AbstractFormPageComponent<
    Site,
    SaveSiteResponse
> {
    constructor(protected _sitesService: SitesService, context: PageContext) {
        super(context);
    }

    protected _getNewModelTitle(): string {
        return 'Создание сайта';
    }
    protected _getService(): AbstractBaseService<Site> {
        return this._sitesService;
    }

    protected _getRoute(): string {
        return '/sites';
    }
}
