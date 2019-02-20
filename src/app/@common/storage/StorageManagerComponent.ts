import { IKeyedCollection, KeyedCollection } from 'app/@common/KeyedCollection';
import {
    Component,
    OnInit,
    Inject,
    ViewChild,
    ElementRef,
    Pipe,
    PipeTransform,
    Input,
    EventEmitter
} from '@angular/core';
import { StorageService, StorageNode } from 'app/@services/StorageService';
import { BehaviorSubject, Observable } from 'rxjs';
import { DialogComponent } from '../modals/DialogComponent';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from '../modals/DialogService';
import { StorageItem } from 'app/@models/results/StorageItem';

@Component({
    selector: 'storage-manager',
    templateUrl: './StorageManagerComponent.html',
    styleUrls: ['./StorageManagerComponent.scss']
})
export class StorageManagerComponent implements OnInit {
    public constructor(
        private _storageService: StorageService,
        private _dialogService: DialogService
    ) {}
    public Items: StorageNode[] = [];
    public columnsToDisplay = ['select', 'icon', 'title', 'size', 'date'];

    @Input()
    public selectMode = false;
    public onSelect = new EventEmitter<StorageNode[]>();

    public currentPath = '/';
    public breadcrumbs = [
        {
            path: '/',
            name: '/'
        }
    ];
    @ViewChild('fileInput') fileInput: ElementRef;

    public selection: IKeyedCollection<StorageNode, string> = new KeyedCollection<StorageNode>();
    ngOnInit(): void {
        let path = localStorage.getItem('beSMPath');
        if (!path) {
            path = '/';
        }
        this.load(path);
    }

    public load(path: string): void {
        this._storageService.get(path).subscribe(items => {
            this.Items = items;
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

    public select(isChecked: boolean, node: StorageNode): void {
        if (isChecked) {
            this.selection.Add(node.Item.FilePath, node);
        } else {
            if (this.selection.ContainsKey(node.Item.FilePath)) {
                this.selection.Remove(node.Item.FilePath);
            }
        }
    }

    public confirmSelect(): void {
        this.onSelect.emit(this.selection.Values());
        this.selection = new KeyedCollection<StorageNode>();
    }

    public enter(node: StorageNode): void {
        if (node.IsDirectory) {
            this.load(node.Path);
        }
    }

    public createFolder(): void {
        this._dialogService
            .show<CreateFolderDialogComponent, string>(CreateFolderDialogComponent, '')
            .dialogRef.afterClosed()
            .subscribe((res: string) => {
                if (res !== '' && res !== null) {
                    let alreadyExists = false;
                    this.Items.forEach(item => {
                        if (item.IsDirectory && item.Name.toLowerCase() === res.toLowerCase()) {
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
        const items: StorageNode[] = [];
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
        <div mat-dialog-content><input type="text" required [(ngModel)]="folderName" /></div>
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
export class CreateFolderDialogComponent extends DialogComponent<string> {
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

@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {
    private units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    transform(bytes: number = 0, precision: number = 2): string {
        if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) {
            return '?';
        }

        let unit = 0;

        while (bytes >= 1024) {
            bytes /= 1024;
            unit++;
        }

        return bytes.toFixed(+precision) + ' ' + this.units[unit];
    }
}
