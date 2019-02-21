import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { DialogComponent } from '../modals/DialogComponent';
import { StorageManagerComponent } from './StorageManagerComponent';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'storageManageDialog',
    template: `
        <h1 mat-dialog-title>Хранилище</h1>
        <div mat-dialog-content><storage-manager [selectMode]="true"></storage-manager></div>
        <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end">
            <button mat-raised-button color="warn" (click)="select()">
                Выбрать
            </button>
        </div>
    `
})
export class StorageManagerDialogComponent extends DialogComponent<any> implements OnInit {
    public constructor(@Inject(MAT_DIALOG_DATA) data: string) {
        super(data);
    }
    @ViewChild(StorageManagerComponent) storageManager: StorageManagerComponent;
    ngOnInit(): void {}

    public select(): void {
        const items = this.storageManager.confirmSelect();
        this.dialogRef.close(items);
    }
}
