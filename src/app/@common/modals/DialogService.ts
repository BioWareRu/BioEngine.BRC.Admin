import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ComponentType} from '@angular/cdk/portal';
import {DialogComponent} from './DialogComponent';
import {DialogConfig} from './DialogConfig';

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    constructor(public dialog: MatDialog) {
    }

    public show<T extends DialogComponent<TData>, TData>(
        dialogComponent: ComponentType<T> | TemplateRef<T>,
        data: TData,
        configure?: (config: DialogConfig) => void): T {
        const config = new DialogConfig();
        if (configure) {
            configure.apply(this, config);
        }
        config.data = data;
        const dialogRef = this.dialog.open<T>(dialogComponent, config);
        dialogRef.componentInstance.dialogRef = dialogRef;
        return dialogRef.componentInstance;
    }
}

