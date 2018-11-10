import { FormPageComponent } from 'app/@common/forms/FormComponent';
import { SaveSiteResponse } from 'app/@models/results/Site';
import { Site } from 'app/@models/Site';
import { BaseService } from 'app/@common/BaseService';
import { PageContext } from 'app/@common/PageComponent';
import { SitesService } from 'app/@services/SitesService';
import { Component } from '@angular/core';
import { Page } from 'app/@models/Page';
import { SavePageResponse } from 'app/@models/results/Page';
import { PagesService } from 'app/@services/PagesService';

@Component({
    selector: 'page-form-page',
    template: `
        <page-form class="model-form" #modelForm [model]="Model"></page-form>
    `,
    providers: [PageContext]
})
export class PageFormPageComponent extends FormPageComponent<
    Page,
    SavePageResponse
> {
    constructor(context: PageContext, protected pagesService: PagesService) {
        super(context);
    }

    protected getNewModelTitle(): string {
        return 'Создание страницы';
    }
    protected getService(): BaseService<Page> {
        return this.pagesService;
    }

    protected getRoute(): string {
        return '/pages';
    }
}
