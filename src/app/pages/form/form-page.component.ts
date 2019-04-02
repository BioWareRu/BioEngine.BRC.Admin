import { Component } from '@angular/core';
import { AbstractBaseService } from '@common/abstract-base-service';
import { AbstractFormPageComponent } from '@common/forms/abstract-form-component';
import { PageContext } from '@common/abstract-page-component';
import { Page } from '@models/Page';
import { SavePageResponse } from '@models/results/Page';
import { PagesService } from '@services/PagesService';

@Component({
    selector: 'page-form-page',
    template: `
        <page-form class="model-form" #modelForm [model]="model"></page-form>
    `,
    providers: [PageContext]
})
export class PageFormPageComponent extends AbstractFormPageComponent<
    Page,
    SavePageResponse
> {
    constructor(protected _pagesService: PagesService, context: PageContext) {
        super(context);
    }

    protected _getNewModelTitle(): string {
        return 'Создание страницы';
    }
    protected _getService(): AbstractBaseService<Page> {
        return this._pagesService;
    }

    protected _getRoute(): string {
        return '/pages';
    }
}
