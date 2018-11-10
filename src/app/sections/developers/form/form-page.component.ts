import { FormPageComponent } from 'app/@common/forms/FormComponent';
import { BaseService } from 'app/@common/BaseService';
import { PageContext } from 'app/@common/PageComponent';
import { Component } from '@angular/core';
import { Developer } from 'app/@models/Developer';
import { SaveDeveloperResponse } from 'app/@models/results/Developer';
import { DevelopersService } from 'app/@services/DevelopersService';

@Component({
    selector: 'developer-form-page',
    template: `
        <developer-form
            class="model-form"
            #modelForm
            [model]="Model"
        ></developer-form>
    `,
    providers: [PageContext]
})
export class DeveloperFormPageComponent extends FormPageComponent<
    Developer,
    SaveDeveloperResponse
> {
    constructor(
        context: PageContext,
        protected developerService: DevelopersService
    ) {
        super(context);
    }

    protected getNewModelTitle(): string {
        return 'Создание разработчика';
    }
    protected getService(): BaseService<Developer> {
        return this.developerService;
    }

    protected getRoute(): string {
        return '/sections/developers';
    }
}
