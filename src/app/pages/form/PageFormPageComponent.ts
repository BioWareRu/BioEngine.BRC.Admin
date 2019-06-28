import { Component } from '@angular/core';
import { AbstractFormPageComponent } from '@common/forms/AbstractFormPageComponent';
import { PageContext } from '@common/PageContext';
import { Page, PagesService } from 'bioengine-angular';

@Component({
    selector: 'page-form-page',
    template: `
        <page-form class="model-form" #modelForm [model]="model"></page-form>
    `,
    providers: [PageContext]
})
export class PageFormPageComponent extends AbstractFormPageComponent<Page, PagesService> {
    constructor(protected _pagesService: PagesService, context: PageContext) {
        super(context);
    }

    protected _getNewModelTitle(): string {
        return 'Создание страницы';
    }

    protected _getService(): PagesService {
        return this._pagesService;
    }

    protected _getRoute(): string {
        return '/pages';
    }
}
