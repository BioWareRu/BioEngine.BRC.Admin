// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { TreeNode } from 'angular-tree-component';
// import { PageContext } from '@common/PageContext';
// import { AbstractDialogComponent, MenuItem } from 'bioengine-angular';
//
// @Component({
//     selector: 'menuItemFormDialog',
//     template: `
//         <h1 mat-dialog-title>Пункт меню {{ item.label }}</h1>
//         <div mat-dialog-content>
//             <menuItemForm [model]="item"></menuItemForm>
//         </div>
//         <div mat-dialog-actions>
//             <button mat-raised-button color="accent" (click)="hideDialog()">
//                 Сохранить
//             </button>
//         </div>
//     `,
//     providers: [PageContext]
// })
// export class MenuItemFormDialogComponent extends AbstractDialogComponent<TreeNode> {
//     public item: MenuItem;
//
//     public constructor(
//         @Inject(MAT_DIALOG_DATA)
//             data: TreeNode) {
//         super(data);
//         this.item = data.data;
//     }
// }
