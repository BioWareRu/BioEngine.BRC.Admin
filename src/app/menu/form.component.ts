import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SingleSiteEntityFormComponent } from '../@common/forms/FormComponent';
import { ServicesProvider } from '../@services/ServicesProvider';
import { Validators } from '@angular/forms';
import { SaveMenuResponse } from '../@models/results/Menu';
import { Menu, MenuItem } from '../@models/Menu';
import { ITreeOptions, TreeComponent, TreeNode } from 'angular-tree-component';
import { DialogService } from '../@common/modals/DialogService';
import { MenuItemFormDialogComponent } from './menuItemForm.component';
import { ConfirmationDialogService } from '../@common/modals/ConfirmationDialogService';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';

@Component({
    selector: 'menu-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MenuFormComponent extends SingleSiteEntityFormComponent<
    Menu,
    SaveMenuResponse
> {
    public options: ITreeOptions = {
        allowDrag: true,
        displayField: 'Label',
        childrenField: 'Items'
    };
    private tree: TreeComponent;

    public constructor(
        servicesProvider: ServicesProvider,
        snackBarService: SnackBarService,
        private dialogService: DialogService,
        private confirmationService: ConfirmationDialogService
    ) {
        super(servicesProvider, snackBarService, servicesProvider.MenuService);
    }

    public constructForm(): void {
        this.registerFormControl('Title', [<any>Validators.required]);
        this.registerFormControl('SiteId', [<any>Validators.required]);
        this.registerFormControl('Items', [<any>Validators.required]);
    }

    public onInit(tree: TreeComponent): void {
        this.tree = tree;
        tree.treeModel.expandAll();
    }

    public deleteMenuItem(currentNode: TreeNode): void {
        const dialog = this.confirmationService.confirm(
            'Удаление пункта меню',
            'Вы точно хотите удалить это пункт меню?'
        );
        dialog.onConfirm.subscribe(() => {
            const root = currentNode.parent
                ? currentNode.parent.data.Items
                : this.model.Items;
            root.splice(root.indexOf(currentNode.data), 1);
            this.tree.treeModel.update();
            this.hasChanges = true;
        });
    }

    public addMenuItem(currentNode: TreeNode = null): void {
        const node = new MenuItem();
        node.Label = 'Новый пункт';
        node.Url = '/';
        node.Items = [];
        const root = !currentNode
            ? this.model.Items
            : (currentNode.data.Items as MenuItem[]);
        root.push(node);
        this.tree.treeModel.update();
        if (currentNode) {
            this.tree.treeModel.getNodeById(currentNode.id).toggleExpanded();
        }
        this.hasChanges = true;
    }

    public openEditDialog(currentNode: TreeNode): void {
        this.dialogService
            .show(MenuItemFormDialogComponent, currentNode)
            .dialogRef.afterClosed()
            .subscribe(() => {
                this.hasChanges = true;
            });
    }

    public loadFormData(menu: Menu = null): void {
        super.loadFormData(menu);
        if (this.model.Items.length === 0) {
            const item = new MenuItem();
            item.Label = 'Начало';
            item.Url = '/';
            this.model.Items.push(item);
        }
    }
}
