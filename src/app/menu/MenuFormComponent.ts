import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AbstractSiteEntityFormComponent, DialogService, Menu, MenuItem, MenuService, PropertiesService, SitesService, SnackBarService } from 'bioengine-angular';
import { MenuBuilder, MenuItemNode } from './MenuBuilder';

export class FlatMenuItem {
    label: string;
    url: string;
    level: number;
    expandable: boolean;
    inEdit: boolean;
}

@Component({
    selector: 'menu-form',
    templateUrl: './MenuFormComponent.html',
    styleUrls: ['./MenuFormComponent.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MenuFormComponent extends AbstractSiteEntityFormComponent<Menu, MenuService> {

    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap = new Map<FlatMenuItem, MenuItemNode>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<MenuItemNode, FlatMenuItem>();

    treeControl: FlatTreeControl<FlatMenuItem>;

    treeFlattener: MatTreeFlattener<MenuItem, FlatMenuItem>;

    dataSource: MatTreeFlatDataSource<MenuItem, FlatMenuItem>;

    /** The selection for checklist */
    checklistSelection = new SelectionModel<FlatMenuItem>(true /* multiple */);

    /* Drag and drop */
    dragNode: any;
    dragNodeExpandOverWaitTimeMs = 300;
    dragNodeExpandOverNode: any;
    dragNodeExpandOverTime: number;
    dragNodeExpandOverArea: string;
    @ViewChild('emptyItem', {static: false}) emptyItem: ElementRef;

    private _builder: MenuBuilder;

    public constructor(
        private readonly _dialogService: DialogService,
        public readonly sitesService: SitesService,
        propertiesService: PropertiesService,
        menuService: MenuService,
        snackBarService: SnackBarService,
    ) {
        super(menuService, propertiesService, snackBarService);

        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<FlatMenuItem>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    }

    protected _constructForm(): void {
        this.registerFormControl('title', [<any>Validators.required]);
        this.registerFormControl('siteIds', [<any>Validators.required]);
        this.registerFormControl('items', [<any>Validators.required]);
    }

    getLevel = (node: FlatMenuItem) => node.level;

    isExpandable = (node: FlatMenuItem) => node.expandable;

    getChildren = (node: MenuItem): MenuItem[] => node.items;

    hasChild = (index: number, nodeData: FlatMenuItem) => nodeData.expandable && !this.inEdit(index, nodeData);

    hasNoContent = (_: number, nodeData: FlatMenuItem) => nodeData.label === '';
    inEdit = (_: number, nodeData: FlatMenuItem) => nodeData.inEdit;

    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: MenuItemNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.label === node.label && existingNode.url === node.url
            ? existingNode
            : new FlatMenuItem();
        flatNode.label = node.label;
        flatNode.url = node.url;
        flatNode.level = level;
        flatNode.expandable = true;
        flatNode.inEdit = node.inEdit;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    };

    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: FlatMenuItem): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);
    }

    /** Select the category so we can insert the new item. */
    addNewItem(node: FlatMenuItem): void {
        const parentNode = this.flatNodeMap.get(node);
        if (!parentNode) {
            return;
        }
        this._builder.insertItem(parentNode, '', '');
        this.treeControl.expand(node);
    }

    editItem(node: FlatMenuItem): void {
        const item = this.flatNodeMap.get(node);
        if (!item) {
            return;
        }
        this._builder.beginEdit(item);
    }

    deleteItem(node: FlatMenuItem): void {
        const item = this.flatNodeMap.get(node);
        if (!item) {
            return;
        }
        this._dialogService
            .confirm('Удаление пункта меню', 'Вы точно хотите удалить это пункт меню?')
            .onConfirm.subscribe(() => {
            this._builder.deleteItem(item);
            this.form.hasChanges = true;
        });

    }

    /** Save the node to database */
    saveNode(node: FlatMenuItem, label: string, url: string): void {
        const nestedNode = this.flatNodeMap.get(node);
        if (!nestedNode) {
            return;
        }
        this._builder.updateItem(nestedNode, label, url);
    }

    handleDragStart(event, node): void {
        // Required by Firefox (https://stackoverflow.com/questions/19055264/why-doesnt-html5-drag-and-drop-work-in-firefox)
        event.dataTransfer.setData('foo', 'bar');
        event.dataTransfer.setDragImage(this.emptyItem.nativeElement, 0, 0);
        this.dragNode = node;
        this.treeControl.collapse(node);
    }

    handleDragOver(event, node): void {
        event.preventDefault();

        // Handle node expand
        if (node === this.dragNodeExpandOverNode) {
            if (this.dragNode !== node
                && !this.treeControl.isExpanded(node)
                && (new Date().getTime() - this.dragNodeExpandOverTime) > this.dragNodeExpandOverWaitTimeMs) {
                this.treeControl.expand(node);
            }
        } else {
            this.dragNodeExpandOverNode = node;
            this.dragNodeExpandOverTime = new Date().getTime();
        }

        // Handle drag area
        const percentageY = event.offsetY / event.target.clientHeight;
        if (percentageY < 0.25) {
            this.dragNodeExpandOverArea = 'above';
        } else if (percentageY > 0.75) {
            this.dragNodeExpandOverArea = 'below';
        } else {
            this.dragNodeExpandOverArea = 'center';
        }
    }

    handleDrop(event, node): void {
        event.preventDefault();
        if (node !== this.dragNode) {
            let newItem: MenuItemNode;
            if (this.dragNodeExpandOverArea === 'above') {
                newItem = this._builder.copyPasteItemAbove(<MenuItemNode>this.flatNodeMap.get(this.dragNode), <MenuItemNode>this.flatNodeMap.get(node));
            } else if (this.dragNodeExpandOverArea === 'below') {
                newItem = this._builder.copyPasteItemBelow(<MenuItemNode>this.flatNodeMap.get(this.dragNode), <MenuItemNode>this.flatNodeMap.get(node));
            } else {
                newItem = this._builder.copyPasteItem(<MenuItemNode>this.flatNodeMap.get(this.dragNode), <MenuItemNode>this.flatNodeMap.get(node));
            }
            this._builder.deleteItem(<MenuItemNode>this.flatNodeMap.get(this.dragNode));
            this.treeControl.expandDescendants(<FlatMenuItem>this.nestedNodeMap.get(newItem));
        }
        this.dragNode = null;
        this.dragNodeExpandOverNode = null;
        this.dragNodeExpandOverTime = 0;
    }

    handleDragEnd(): void {
        this.dragNode = null;
        this.dragNodeExpandOverNode = null;
        this.dragNodeExpandOverTime = 0;
    }

    public loadFormData(menu: Menu | null = null): void {
        super.loadFormData(menu);
        if (this.model && this.model.items.length === 0) {
            const item = new MenuItemNode('Начало', '/');
            this.model.items.push(item);
        }
        if (this.model !== null) {
            this._builder = new MenuBuilder(<MenuItemNode[]>this.model.items);
            this._builder.dataChange.subscribe(data => {
                this.dataSource.data = [];
                this.dataSource.data = data;
                this.form.getControlByProperty('items').patchValue(data);
                this.form.hasChanges = true;
            });
        }
    }

    addRootItem(): void {
        this._builder.insertRootItem('', '');
    }
}
