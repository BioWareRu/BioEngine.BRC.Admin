import { Component, ElementRef, Inject, Input, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { StorageNode, StorageService } from '@services/StorageService';
import Dictionary from '../Dictionary';
import { AbstractDialogComponent } from '../modals/abstract-dialog-component';
import { DialogService } from '../modals/DialogService';

@Component({
    selector: 'storage-manager',
    templateUrl: './StorageManagerComponent.html',
    styleUrls: ['./StorageManagerComponent.scss']
})
export class StorageManagerComponent implements OnInit {
    public constructor(
        private readonly _storageService: StorageService,
        private readonly _dialogService: DialogService
    ) {
    }

    public items: Array<StorageNode> = [];
    public columnsToDisplay = ['select', 'icon', 'title', 'size', 'date'];

    @Input()
    public selectMode = StorageManagerSelectMode.None;
    public selectModes = StorageManagerSelectMode;

    public currentPath = '/';
    public breadcrumbs = [
        {
            path: '/',
            name: '/'
        }
    ];
    @ViewChild('fileInput') fileInput: ElementRef;

    public selection = new Dictionary<string, StorageNode>();

    ngOnInit(): void {
        let path = localStorage.getItem('beSMPath');
        if (!path) {
            path = '/';
        }
        this.load(path);
    }

    public load(path: string): void {
        this._storageService.get(path).subscribe(items => {
            this.items = items;
            this.currentPath = path;
            localStorage.setItem('beSMPath', this.currentPath);
            const parts = path.split('/');
            const breadcrumbs = [
                {
                    name: '/',
                    path: '/'
                }
            ];
            let currentPath = '/';
            parts.forEach(part => {
                if (!part || part === '/') {
                    return;
                }
                currentPath = currentPath + '/' + part;
                breadcrumbs.push({
                    name: part,
                    path: currentPath
                });
            });
            this.breadcrumbs = breadcrumbs;
        });
    }

    public select(node: StorageNode): void {
        if (this.selectMode === StorageManagerSelectMode.None) {
            return;
        }
        if (!node.selected) {
            if (this.selectMode === StorageManagerSelectMode.Single) {
                this.selection.forEach((_, selectedNode) => {
                    selectedNode.selected = false;
                });
                this.selection.clear();
            }
            this.selection.set(node.item.filePath, node);
            node.selected = true;

        } else if (this.selection.hasKey(node.item.filePath)) {
            this.selection.remove(node.item.filePath);
            node.selected = false;
        }
    }

    public confirmSelect(): Array<StorageNode> {
        const items = this.selection.values();
        this.selection.clear();

        return items;
    }

    public enter(node: StorageNode): void {
        if (node.isDirectory) {
            this.load(node.path);
        }
    }

    public createFolder(): void {
        this._dialogService
            .show<CreateFolderDialogComponent, string>(CreateFolderDialogComponent, '')
            .dialogRef.afterClosed()
            .subscribe((res: string) => {
                if (res !== '' && res !== null) {
                    let alreadyExists = false;
                    this.items.forEach(item => {
                        if (item.isDirectory && item.name.toLowerCase() === res.toLowerCase()) {
                            alreadyExists = true;
                        }
                    });
                    if (alreadyExists) {
                        alert('folder already exists');
                    } else {
                        this.load((this.currentPath + '/' + res).replace('//', '/'));
                    }
                }
            });
    }

    public upload(): void {
        this.fileInput.nativeElement.click();
    }

    public fileChange($event): void {
        const fileList: FileList = $event.target.files;
        const lenght = fileList.length;
        const items: Array<StorageNode> = [];
        for (let i = 0; i < lenght; i++) {
            const file = fileList[i];
            this._storageService.upload(file, this.currentPath).subscribe(item => {
                items.push(item);
                if (items.length === lenght) {
                    this.load(this.currentPath);
                }
            });
        }
    }
}

@Component({
    selector: 'confirmation-dialog-component',
    template: `
        <h1 mat-dialog-title>Создать папку</h1>
        <div mat-dialog-content><input type="text" required [(ngModel)]="folderName"/></div>
        <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end">
            <button mat-raised-button color="warn" (click)="cancel()">Отмена</button>
            <button
                    mat-raised-button
                    color="accent"
                    cdkFocusInitial
                    [disabled]="folderName === null || folderName === ''"
                    (keydown.enter)="confirm()"
                    (click)="confirm()"
            >
                Создать
            </button>
        </div>
    `
})
export class CreateFolderDialogComponent extends AbstractDialogComponent<string> {
    public folderName: string;

    public constructor(@Inject(MAT_DIALOG_DATA) data: string) {
        super(data);
    }

    public confirm(): void {
        this.dialogRef.close(this.folderName);
    }

    public cancel(): void {
        this.dialogRef.close();
    }
}

@Pipe({name: 'fileSize'})
export class FileSizePipe implements PipeTransform {
    private readonly _units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    transform(bytes: number = 0, precision: number = 2): string {
        if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) {
            return '?';
        }

        let unit = 0;

        while (bytes >= 1024) {
            bytes /= 1024;
            unit++;
        }

        return bytes.toFixed(+precision) + ' ' + this._units[unit];
    }
}

export enum StorageManagerSelectMode {
    None = 1,
    Single = 2,
    Multiple = 3
}
