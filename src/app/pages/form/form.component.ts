import {Component, OnInit} from '@angular/core';
import {PageContext} from '../../@common/PageComponent';
import {SiteEntityFormComponent} from '../../@common/forms/FormComponent';
import {SavePageResponse} from '../../@models/results/Page';
import {ServicesProvider} from '../../@services/ServicesProvider';
import {BaseService} from '../../@common/BaseService';
import {Page} from '../../@models/Page';
import {Validators} from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'developerForm',
    templateUrl: './form.component.html',
    providers: [
        PageContext
    ]
})
export class PageFormComponent extends SiteEntityFormComponent<Page, SavePageResponse> implements OnInit {

    public constructor(context: PageContext, servicesProvider: ServicesProvider) {
        super(context, servicesProvider);
    }

    public constructForm(): void {
        this.registerFormControl('Title', [<any>Validators.required]);
        this.registerFormControl('Url', [<any>Validators.required]);
        this.registerFormControl('SiteIds', [<any>Validators.required]);
        this.registerFormControl('Text', [<any>Validators.required]);
    }

    protected getNewModelTitle(): string {
        return 'Создание страницы';
    }

    protected getRoute(): string {
        return '/pages';
    }

    protected getService(): BaseService<Page> {
        return this.servicesProvider.PagesService;
    }


}
