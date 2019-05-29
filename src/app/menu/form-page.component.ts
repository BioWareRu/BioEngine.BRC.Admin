import { Component } from '@angular/core';
import { AbstractBaseService } from '@common/abstract-base-service';
import { AbstractFormPageComponent } from '@common/forms/AbstractFormPageComponent';
import { PageContext } from '@common/PageContext';
import { Menu } from '@models/Menu';
import { SaveMenuResponse } from '@models/results/SaveMenuResponse';
import { MenuService } from '@services/MenuService';

@Component({
    selector: 'menu-form-page',
    template: `
        <menu-form class="model-form" #modelForm [model]="model"></menu-form>
    `,
    providers: [PageContext]
})
export class MenuFormPageComponent extends AbstractFormPageComponent<
    Menu,
    SaveMenuResponse
> {
    constructor(protected _menuService: MenuService, pageContext: PageContext) {
        super(pageContext);
    }

    protected _getRoute(): string {
        return '/menu';
    }

    protected _getService(): AbstractBaseService<Menu> {
        return this._menuService;
    }

    protected _getNewModelTitle(): string {
        return 'Создание меню';
    }
}
