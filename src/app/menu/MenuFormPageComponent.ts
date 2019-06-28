import { Component } from '@angular/core';
import { AbstractFormPageComponent } from '@common/forms/AbstractFormPageComponent';
import { PageContext } from '@common/PageContext';
import { Menu, MenuService } from 'bioengine.core.api.client';

@Component({
    selector: 'menu-form-page',
    template: `
        <menu-form class="model-form" #modelForm [model]="model"></menu-form>
    `,
    providers: [PageContext]
})
export class MenuFormPageComponent extends AbstractFormPageComponent<Menu, MenuService> {
    constructor(protected _menuService: MenuService, pageContext: PageContext) {
        super(pageContext);
    }

    protected _getRoute(): string {
        return '/menu';
    }

    protected _getService(): MenuService {
        return this._menuService;
    }

    protected _getNewModelTitle(): string {
        return 'Создание меню';
    }
}
