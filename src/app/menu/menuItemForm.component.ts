import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { TreeNode } from 'angular-tree-component';
import { AbstractSimpleFormComponent } from '@common/forms/abstract-form-component';
import { AbstractDialogComponent } from '@common/modals/abstract-dialog-component';
import { PageContext } from '@common/abstract-page-component';
import { MenuItem } from '@models/Menu';

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

@Component({
    moduleId: module.id,
    selector: 'menuItemFormDialog',
    template: `
        <h1 mat-dialog-title>Пункт меню {{ item.label }}</h1>
        <div mat-dialog-content>
            <menuItemForm [model]="item"></menuItemForm>
        </div>
        <div mat-dialog-actions>
            <button mat-raised-button color="accent" (click)="hideDialog()">
                Сохранить
            </button>
        </div>
    `,
    providers: [PageContext]
})
export class MenuItemFormDialogComponent extends AbstractDialogComponent<TreeNode> {
    public item: MenuItem;

    public constructor(@Inject(MAT_DIALOG_DATA) data: TreeNode) {
        super(data);
        this.item = data.data;
    }
}
