import { Menu } from 'app/@models/Menu';
import { SaveMenuResponse } from 'app/@models/results/Menu';
import { FormPageComponent } from 'app/@common/forms/FormComponent';
import { PageContext } from 'app/@common/PageComponent';
import { MenuService } from 'app/@services/MenuService';
import { BaseService } from 'app/@common/BaseService';
import { Component } from '@angular/core';

@Component({
    selector: 'menu-form-page',
    template: `
        <menu-form class="model-form" #modelForm [model]="Model"></menu-form>
    `,
    providers: [PageContext]
})
export class MenuFormPageComponent extends FormPageComponent<
    Menu,
    SaveMenuResponse
> {
    constructor(pageContext: PageContext, protected menuService: MenuService) {
        super(pageContext);
    }

    protected getRoute(): string {
        return '/menu';
    }

    protected getService(): BaseService<Menu> {
        return this.menuService;
    }

    protected getNewModelTitle(): string {
        return 'Создание меню';
    }
}
