import { MenuItem } from 'bioengine-angular';
import { BehaviorSubject } from 'rxjs';

export class MenuItemNode extends MenuItem {
    inEdit: boolean;
}

export class MenuBuilder {
    dataChange = new BehaviorSubject<MenuItemNode[]>([]);

    get data(): MenuItemNode[] {
        return this.dataChange.value;
    }

    constructor(items: MenuItemNode[]) {
        this.dataChange.next(items);
    }

    insertRootItem(label: string, url: string): MenuItemNode {
        const item = new MenuItemNode(label, url);
        this.data.push(item);
        this.dataChange.next(this.data);
        return item;
    }

    insertItem(parent: MenuItemNode, label: string, url: string): MenuItemNode {
        if (!parent.items) {
            parent.items = [];
        }
        const item = new MenuItemNode(label, url);
        parent.items.push(item);
        this.dataChange.next(this.data);
        return item;
    }

    insertItemAbove(node: MenuItemNode, label: string, url: string): MenuItemNode {
        const parentNode = this.getParentFromNodes(node);
        const newItem = new MenuItemNode(label, url);
        if (parentNode != null) {
            parentNode.items.splice(parentNode.items.indexOf(node), 0, newItem);
        } else {
            this.data.splice(this.data.indexOf(node), 0, newItem);
        }
        this.dataChange.next(this.data);
        return newItem;
    }

    insertItemBelow(node: MenuItemNode, label: string, url: string): MenuItemNode {
        const parentNode = this.getParentFromNodes(node);
        const newItem = new MenuItemNode(label, url);
        if (parentNode != null) {
            parentNode.items.splice(parentNode.items.indexOf(node) + 1, 0, newItem);
        } else {
            this.data.splice(this.data.indexOf(node) + 1, 0, newItem);
        }
        this.dataChange.next(this.data);
        return newItem;
    }

    getParentFromNodes(node: MenuItemNode): MenuItemNode | null {
        for (let i = 0; i < this.data.length; ++i) {
            const currentRoot = this.data[i];
            const parent = this.getParent(currentRoot, node);
            if (parent != null) {
                return parent;
            }
        }
        return null;
    }

    getParent(currentRoot: MenuItemNode, node: MenuItemNode): MenuItemNode | null {
        if (currentRoot.items && currentRoot.items.length > 0) {
            for (let i = 0; i < currentRoot.items.length; ++i) {
                const child = currentRoot.items[i];
                if (child === node) {
                    return currentRoot;
                }
                if (child.items && child.items.length > 0) {
                    const parent = this.getParent(<MenuItemNode>child, node);
                    if (parent != null) {
                        return parent;
                    }
                }
            }
        }
        return null;
    }

    beginEdit(node: MenuItemNode): void {
        node.inEdit = true;
        this.dataChange.next(this.data);
    }

    updateItem(node: MenuItemNode, label: string, url: string): void {
        node.label = label;
        node.url = url;
        node.inEdit = false;
        this.dataChange.next(this.data);
    }

    deleteItem(node: MenuItemNode): void {
        this.deleteNode(this.data, node);
        this.dataChange.next(this.data);
    }

    copyPasteItem(from: MenuItemNode, to: MenuItemNode): MenuItemNode {
        const newItem = this.insertItem(to, from.label, from.url);
        if (from.items) {
            from.items.forEach(child => {
                this.copyPasteItem(<MenuItemNode>child, newItem);
            });
        }
        return newItem;
    }

    copyPasteItemAbove(from: MenuItemNode, to: MenuItemNode): MenuItemNode {
        const newItem = this.insertItemAbove(to, from.label, from.url);
        if (from.items) {
            from.items.forEach(child => {
                this.copyPasteItem(<MenuItemNode>child, newItem);
            });
        }
        return newItem;
    }

    copyPasteItemBelow(from: MenuItemNode, to: MenuItemNode): MenuItemNode {
        const newItem = this.insertItemBelow(to, from.label, from.url);
        if (from.items) {
            from.items.forEach(child => {
                this.copyPasteItem(<MenuItemNode>child, newItem);
            });
        }
        return newItem;
    }

    deleteNode(nodes: MenuItemNode[], nodeToDelete: MenuItemNode): void {
        const index = nodes.indexOf(nodeToDelete, 0);
        if (index > -1) {
            nodes.splice(index, 1);
        } else {
            nodes.forEach(node => {
                if (node.items && node.items.length > 0) {
                    this.deleteNode(<MenuItemNode[]>node.items, nodeToDelete);
                }
            });
        }
    }
}
