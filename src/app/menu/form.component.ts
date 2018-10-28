import {Component, OnInit} from '@angular/core';
import {PageContext} from '../@common/PageComponent';
import {SiteEntityFormComponent} from '../@common/forms/FormComponent';
import {ServicesProvider} from '../@services/ServicesProvider';
import {BaseService} from '../@common/BaseService';
import {Validators} from '@angular/forms';
import {SaveMenuResponse} from '../@models/results/Menu';
import {Menu} from '../@models/Menu';

// import {ITreeOptions, TreeComponent, TreeNode} from 'angular-tree-component';


@Component({
    moduleId: module.id,
    selector: 'menuForm',
    templateUrl: './form.component.html',
    providers: [
        PageContext
    ]
})
export class MenuFormComponent extends SiteEntityFormComponent<Menu, SaveMenuResponse> implements OnInit {

    public constructor(context: PageContext, servicesProvider: ServicesProvider) {
        super(context, servicesProvider);
    }

    public constructForm(): void {
        this.registerFormControl('Title', [<any>Validators.required]);
        this.registerFormControl('SiteIds', [<any>Validators.required]);
        this.registerFormControl('Items', [<any>Validators.required]);
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

    /*public options: ITreeOptions = {
      allowDrag: true,
      actionMapping: {
        mouse: {
          dblClick: (tree, node, $event) => {
            this.openEditDialog(node);
          }
        },
      },
      displayField: 'Label',
      childrenField: 'Items'
    };
    public menuItems = [
      {
        title: 'Добавить', data: {
          action: 'add'
        }
      },
      {
        title: 'Редактировать', data: {
          action: 'edit'
        }
      },
      {
        title: 'Удалить', data: {
          action: 'delete'
        }
      },
    ];
    public currentNode: TreeNode;
    private tree: TreeComponent;



    public onInit(tree: TreeComponent): void {
      this.tree = tree;
      tree.treeModel.expandAll();
      this.nbMenuService.onItemClick()
        .subscribe(action => {
          switch (action.item.data.action) {
            case 'add':
              this.addMenuItem();
              break;
            case 'edit':
              this.openEditDialog(this.currentNode);
              break;
            case 'delete':
              this.deleteMenuItem();
              break;
          }
        });
    }

    public deleteMenuItem(): void {
      const root = this.currentNode.parent ? this.currentNode.parent.data.Items : this.model.Items;
      root.splice(root.indexOf(this.currentNode.data), 1);
      this.tree.treeModel.update();
      this.hasChanges = true;
    }

    public addMenuItem(toRoot: boolean = false): void {
      const node = new MenuItem();
      node.Label = 'Новый пункт';
      node.Url = '/';
      node.Items = [];
      const currentNode = this.currentNode ? this.currentNode.data : null;
      const root = toRoot || !this.currentNode.data ? this.model.Items : this.currentNode.data.Items as MenuItem[];
      root.push(node);
      this.tree.treeModel.update();
      if (currentNode) {
        this.tree.treeModel.getNodeById(currentNode.id).toggleExpanded();
      }
      this.hasChanges = true;
    }

    public onActivate($event): void {
      this.currentNode = $event.node;
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

    private openEditDialog(node): void {
      const context: Partial<NbDialogConfig<any>> = {
        context: {
          model: node
        }
      };
      this.dialogService.open(MenuItemFormDialogComponent, context).onClose.subscribe(() => {
        this.hasChanges = true;
      });
    }*/
}
