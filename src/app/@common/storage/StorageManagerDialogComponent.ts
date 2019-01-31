import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { DialogComponent } from '../modals/DialogComponent';
import { StorageManagerComponent } from './StorageManagerComponent';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'storageManageDialog',
    template: `
        <h1 mat-dialog-title>Хранилище</h1>
        <div mat-dialog-content><storage-manager [selectMode]="true"></storage-manager></div>
    `
})
export class StorageManagerDialogComponent extends DialogComponent<any> implements OnInit {
    public constructor(@Inject(MAT_DIALOG_DATA) data: string) {
        super(data);
    }
    @ViewChild(StorageManagerComponent) storageManager: StorageManagerComponent;
    ngOnInit(): void {
        this.storageManager.onSelect.subscribe(items => {
            this.dialogRef.close(items);
        });
    }
}
