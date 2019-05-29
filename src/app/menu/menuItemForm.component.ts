import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { AbstractSimpleFormComponent } from "@common/forms/AbstractSimpleFormComponent";
import { MenuItem } from "@models/MenuItem";

@Component({
    moduleId: module.id,
    selector: 'menuItemForm',
    templateUrl: './menuItemForm.component.html'
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
