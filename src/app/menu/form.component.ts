import { Component, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { AbstractSiteEntityFormComponent } from '@common/forms/AbstractSiteEntityFormComponent';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { MenuService } from '@services/MenuService';
import { ITreeOptions, TreeComponent, TreeNode } from 'angular-tree-component';
import { DialogService } from '@common/modals/DialogService';
import { Menu } from '@models/Menu';
import { MenuItem } from '@models/MenuItem';
import { ServicesProvider } from '@services/ServicesProvider';
import { MenuItemFormDialogComponent } from './MenuItemFormDialogComponent';

@Component({
    selector: 'menu-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MenuFormComponent extends AbstractSiteEntityFormComponent<Menu, MenuService> {
    public options: ITreeOptions = {
        allowDrag: true,
        displayField: 'inputLabel',
        childrenField: 'items'
    };
    private _tree: TreeComponent;

    public constructor(
        private readonly _dialogService: DialogService,
        servicesProvider: ServicesProvider,
        snackBarService: SnackBarService
    ) {
        super(servicesProvider, servicesProvider.menuService, snackBarService);
    }

    protected _constructForm(): void {
        this.registerFormControl('title', [<any>Validators.required]);
        this.registerFormControl('siteId', [<any>Validators.required]);
        this.registerFormControl('items', [<any>Validators.required]);
    }

    public onInit(tree: TreeComponent): void {
        this._tree = tree;
        tree.treeModel.expandAll();
    }

    public deleteMenuItem(currentNode: TreeNode): void {
        if (!this.model) {
            throw new Error('No model');
        }
        this._dialogService
            .confirm('Удаление пункта меню', 'Вы точно хотите удалить это пункт меню?')
            .onConfirm.subscribe(() => {
                // @ts-ignore
                const root = currentNode.parent ? currentNode.parent.data.items : this.model.Items;
                root.splice(root.indexOf(currentNode.data), 1);
                this._tree.treeModel.update();
                this.form.hasChanges = true;
            });
    }

    public addMenuItem(currentNode: TreeNode | null = null): void {
        if (!this.model) {
            throw new Error('No model');
        }
        const node = new MenuItem();
        node.label = 'Новый пункт';
        node.url = '/';
        node.items = [];
        const root = !currentNode ? this.model.items : (<Array<MenuItem>>currentNode.data.items);
        root.push(node);
        this._tree.treeModel.update();
        if (currentNode) {
            this._tree.treeModel.getNodeById(currentNode.id).toggleExpanded();
        }
        this.form.hasChanges = true;
    }

    public openEditDialog(currentNode: TreeNode): void {
        this._dialogService
            .show(MenuItemFormDialogComponent, currentNode)
            .dialogRef.afterClosed()
            .subscribe(() => {
                this.form.hasChanges = true;
            });
    }

    public loadFormData(menu: Menu | null = null): void {
        super.loadFormData(menu);
        if (this.model && this.model.items.length === 0) {
            const item = new MenuItem();
            item.label = 'Начало';
            item.url = '/';
            this.model.items.push(item);
        }
    }
}
