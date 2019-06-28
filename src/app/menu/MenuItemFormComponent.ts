import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AbstractSimpleFormComponent, MenuItem, SnackBarService } from 'bioengine-angular';

@Component({
    selector: 'menuItemForm',
    templateUrl: './MenuItemFormComponent.html'
})
export class MenuItemFormComponent extends AbstractSimpleFormComponent<MenuItem> {
    public constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    protected _constructForm(): void {
        this.registerFormControl('label', [Validators.required]);
        this.registerFormControl('url', [Validators.required]);
    }
}
