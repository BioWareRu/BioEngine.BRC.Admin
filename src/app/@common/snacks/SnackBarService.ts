import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {SnackBarMessage} from './SnackBarMessage';
import {NotificationComponent} from './NotificationComponent';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    constructor(public snackBar: MatSnackBar) {
    }

    public show(snackBarMessage: SnackBarMessage, panelClass: string): void {
        const ref = this.snackBar.openFromComponent(NotificationComponent, {
            data: snackBarMessage,
            duration: snackBarMessage.duration,
            panelClass: panelClass,
            verticalPosition: snackBarMessage.verticalPosition,
            horizontalPosition: snackBarMessage.horizontalPosition
        });
        ref.instance.instance = ref;
    }

    public error(snackBarMessage: SnackBarMessage): void {
        this.show(snackBarMessage, 'panel-warn');
    }

    public success(snackBarMessage: SnackBarMessage): void {
        this.show(snackBarMessage, 'panel-accent');
    }

    public info(snackBarMessage: SnackBarMessage): void {
        this.show(snackBarMessage, 'panel-primary');
    }
}

export enum SnackBarType {
    Warning,
    Error,
    Success,
    Info
}
