import { Component, ViewChild, Inject } from '@angular/core';
import { DialogComponent } from '../modals/DialogComponent';
import { StorageManagerComponent } from './StorageManagerComponent';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'storageManageDialog',
    template: `
        <h1 mat-dialog-title>Хранилище</h1>
        <div mat-dialog-content><storage-manager></storage-manager></div>
    `
})
export class StorageManagerDialogComponent extends DialogComponent<any> {
    @ViewChild(StorageManagerComponent) storageManager: StorageManagerComponent;

    public constructor(@Inject(MAT_DIALOG_DATA) data: string) {
        super(data);
    }
}
