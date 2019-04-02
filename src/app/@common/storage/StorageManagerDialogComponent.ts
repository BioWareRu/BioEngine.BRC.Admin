import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AbstractDialogComponent } from '../modals/abstract-dialog-component';
import { StorageManagerComponent } from './StorageManagerComponent';

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
export class StorageManagerDialogComponent extends AbstractDialogComponent<any> implements OnInit {
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
