import {Component, Inject} from '@angular/core';
import {PageContext} from '../@common/PageComponent';
import {TreeNode} from 'angular-tree-component';
import {SimpleFormComponent} from '../@common/forms/FormComponent';
import {Validators} from '@angular/forms';
import {DialogComponent} from '../@common/modals/DialogComponent';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'menuItemForm',
    templateUrl: './menuItemForm.component.html',
    providers: [
        PageContext
    ]
})
export class MenuItemFormComponent extends SimpleFormComponent<TreeNode> {

    public constructor(context: PageContext) {
        super(context);
    }

    protected constructForm(): void {
        this.registerFormControl('Label', [<any>Validators.required]);
        this.registerFormControl('Url', [<any>Validators.required]);
    }
}

@Component({
    moduleId: module.id,
    selector: 'menuItemFormDialog',
    template: `
        <h1 mat-dialog-title>Пункт меню {{data.name}}</h1>
        <div mat-dialog-content>
            <menuItemForm [Model]="data.data">

            </menuItemForm>
        </div>
        <div mat-dialog-actions>
            <button mat-raised-button color="accent" (click)="hideDialog()">Сохранить</button>
        </div>
    `,
    providers: [
        PageContext
    ]
})
export class MenuItemFormDialogComponent extends DialogComponent<TreeNode> {
    public constructor(
        @Inject(MAT_DIALOG_DATA) data: TreeNode) {
        super(data);
    }
}
