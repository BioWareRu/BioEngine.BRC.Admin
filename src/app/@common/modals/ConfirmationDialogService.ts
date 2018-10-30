import {DialogService} from './DialogService';
import {Component, EventEmitter, Inject, Injectable} from '@angular/core';
import {DialogComponent} from './DialogComponent';
import {MAT_DIALOG_DATA} from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class ConfirmationDialogService {
    constructor(private dialogService: DialogService) {
    }

    public confirm(
        title: string,
        text: string,
        confirmText: string = 'Да',
        cancelText: string = 'Нет'
    ): ConfirmationDialogComponent {
        return this.dialogService.show(
            ConfirmationDialogComponent,
            new ConfirmationDialogComponentData(title, text, confirmText, cancelText),
            config => {
            }
        );
    }
}

@Component({
    selector: 'confirmation-dialog-component',
    template: `
        <h1 mat-dialog-title>{{data.title}}</h1>
        <div mat-dialog-content>
            {{data.text}}
        </div>
        <div mat-dialog-actions fxLayout="row" fxLayoutAlign="end">
            <button mat-raised-button color="warn" (click)="cancel()">{{data.cancelText}}</button>
            <button mat-raised-button color="accent" cdkFocusInitial (keydown.enter)="confirm()" (click)="confirm()">
                {{data.confirmText}}
            </button>
        </div>
    `
})
export class ConfirmationDialogComponent extends DialogComponent<ConfirmationDialogComponentData> {
    public onConfirm = new EventEmitter();
    public onCancel = new EventEmitter();

    public constructor(
        @Inject(MAT_DIALOG_DATA) data: ConfirmationDialogComponentData) {
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
    constructor(public title: string, public text: string, public confirmText: string, public cancelText: string) {

    }
}
