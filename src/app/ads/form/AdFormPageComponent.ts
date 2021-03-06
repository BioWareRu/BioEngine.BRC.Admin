import { Component } from '@angular/core';
import { AbstractFormPageComponent } from '@common/forms/AbstractFormPageComponent';
import { PageContext } from '@common/PageContext';
import { Ad } from '@models/Ad';
import { AdsService } from '@services/AdsService';

@Component({
    selector: 'ad-form-page',
    template: `
        <ad-form class="model-form" #modelForm [model]="model"></ad-form>
    `,
    providers: [PageContext]
})
export class AdFormPageComponent extends AbstractFormPageComponent<Ad, AdsService> {
    constructor(protected _adsService: AdsService, context: PageContext) {
        super(context);
    }

    protected _getNewModelTitle(): string {
        return 'Создание баннера';
    }
    protected _getService(): AdsService {
        return this._adsService;
    }

    protected _getRoute(): string {
        return '/ads';
    }
}
