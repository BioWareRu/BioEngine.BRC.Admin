import { FormPageComponent } from 'app/@common/forms/FormComponent';
import { SaveSiteResponse } from 'app/@models/results/Site';
import { Site } from 'app/@models/Site';
import { BaseService } from 'app/@common/BaseService';
import { PageContext } from 'app/@common/PageComponent';
import { SitesService } from 'app/@services/SitesService';
import { Component } from '@angular/core';

@Component({
    selector: 'site-form-page',
    template: `
        <site-form class="model-form" #modelForm [model]="Model"></site-form>
    `,
    providers: [PageContext]
})
export class SiteFormPageComponent extends FormPageComponent<
    Site,
    SaveSiteResponse
> {
    constructor(context: PageContext, protected sitesService: SitesService) {
        super(context);
    }

    protected getNewModelTitle(): string {
        return 'Создание сайта';
    }
    protected getService(): BaseService<Site> {
        return this.sitesService;
    }

    protected getRoute(): string {
        return '/sites';
    }
}
