import {Component} from '@angular/core';
import {PageContext} from '../../@common/PageComponent';
import {SimpleFormComponent} from '../../@common/forms/FormComponent';
import {TreeNode} from 'angular-tree-component';
import {NbDialogRef} from '@nebular/theme';
import {Validators} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'menuItemForm',
  templateUrl: './menuItemForm.component.html',
  providers: [
    PageContext
  ]
})
export class MenuItemFormComponent extends SimpleFormComponent<TreeNode> {

  public constructor(context: PageContext, protected dialogRef: NbDialogRef<MenuItemFormComponent>) {
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
    <nb-card [style.width.px]="600" [style.height.px]="500">
      <nb-card-header>Пункт меню {{model.data.name}}</nb-card-header>
      <nb-card-body>
        <menuItemForm [Model]="model.data">

        </menuItemForm>
      </nb-card-body>
      <nb-card-footer>
        <button class="btn btn-success" (click)="save()">Сохранить</button>
      </nb-card-footer>
    </nb-card>
  `,
  providers: [
    PageContext
  ]
})
export class MenuItemFormDialogComponent {
  public constructor(protected dialogRef: NbDialogRef<MenuItemFormDialogComponent>) {
  }

  public save(): void {
    this.dialogRef.close();
  }
}
