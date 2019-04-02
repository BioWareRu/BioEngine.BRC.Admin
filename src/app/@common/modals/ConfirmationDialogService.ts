import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AbstractDialogComponent } from './abstract-dialog-component';

@Component({
    selector: 'confirmation-dialog-component',
    template: `
        <h1 mat-dialog-title>{{ data.title }}</h1>
        <div mat-dialog-content>{{ data.text }}</div>
        <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end">
            <button mat-raised-button color="warn" (click)="cancel()">
                {{ data.cancelText }}
            </button>
            <button
                mat-raised-button
                color="accent"
                cdkFocusInitial
                (keydown.enter)="confirm()"
                (click)="confirm()"
            >
                {{ data.confirmText }}
            </button>
        </div>
    `
})
export class ConfirmationDialogComponent extends AbstractDialogComponent<
    ConfirmationDialogComponentData
> {
    public onConfirm = new EventEmitter();
    public onCancel = new EventEmitter();

    public constructor(
        @Inject(MAT_DIALOG_DATA) data: ConfirmationDialogComponentData
    ) {
        super(data);
    }

    public cancel(): void {
        this.onCancel.emit();
        this.hideDialog();
    }

    public confirm(): void {
        this.onConfirm.emit();
        this.hideDialog();
    }
}

export class ConfirmationDialogComponentData {
    constructor(
        public title: string,
        public text: string,
        public confirmText: string,
        public cancelText: string
    ) {}
}
