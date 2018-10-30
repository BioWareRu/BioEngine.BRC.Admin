import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageContext} from '../@common/PageComponent';
import {SiteEntityFormComponent} from '../@common/forms/FormComponent';
import {ServicesProvider} from '../@services/ServicesProvider';
import {BaseService} from '../@common/BaseService';
import {Validators} from '@angular/forms';
import {SaveMenuResponse} from '../@models/results/Menu';
import {Menu, MenuItem} from '../@models/Menu';
import {ITreeOptions, TreeComponent, TreeNode} from 'angular-tree-component';
import {DialogService} from '../@common/modals/DialogService';
import {MenuItemFormDialogComponent} from './menuItemForm.component';
import {ConfirmationDialogService} from '../@common/modals/ConfirmationDialogService';

@Component({
    moduleId: module.id,
    selector: 'menuForm',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [
        PageContext
    ],
    encapsulation: ViewEncapsulation.None
})
export class MenuFormComponent extends SiteEntityFormComponent<Menu, SaveMenuResponse> implements OnInit {

    public options: ITreeOptions = {
        allowDrag: true,
        displayField: 'Label',
        childrenField: 'Items'
    };
    private tree: TreeComponent;

    public constructor(context: PageContext, servicesProvider: ServicesProvider, private dialogService: DialogService,
                       private confirmationService: ConfirmationDialogService) {
        super(context, servicesProvider);
    }

    public constructForm(): void {
        this.registerFormControl('Title', [<any>Validators.required]);
        this.registerFormControl('SiteIds', [<any>Validators.required]);
        this.registerFormControl('Items', [<any>Validators.required]);
    }

    public onInit(tree: TreeComponent): void {
        this.tree = tree;
        tree.treeModel.expandAll();
    }

    public deleteMenuItem(currentNode: TreeNode): void {
        const dialog = this.confirmationService.confirm('Удаление пункта меню', 'Вы точно хотите удалить это пункт меню?');
        dialog.onConfirm.subscribe(() => {
            const root = currentNode.parent ? currentNode.parent.data.Items : this.model.Items;
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
        const root = !currentNode ? this.model.Items : currentNode.data.Items as MenuItem[];
        root.push(node);
        this.tree.treeModel.update();
        if (currentNode) {
            this.tree.treeModel.getNodeById(currentNode.id).toggleExpanded();
        }
        this.hasChanges = true;
    }

    public openEditDialog(currentNode: TreeNode): void {
        this.dialogService.show(MenuItemFormDialogComponent, currentNode);
        /*const context: Partial<NbDialogConfig<any>> = {
          context: {
            model: node
          }
        };
        this.dialogService.open(MenuItemFormDialogComponent, context).onClose.subscribe(() => {
          this.hasChanges = true;
        });*/
    }

    protected getRoute(): string {
        return '/menu';
    }

    protected getService(): BaseService<Menu> {
        return this.servicesProvider.MenuService;
    }

    protected getNewModelTitle(): string {
        return 'Создание меню';
    }

    protected loadFormData(): void {
        if (this.model.Items.length === 0) {
            const item = new MenuItem();
            item.Label = 'Начало';
            item.Url = '/';
            this.model.Items.push(item);
        }
        super.loadFormData();
    }
}
