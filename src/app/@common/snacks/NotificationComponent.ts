import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
import { SnackBarMessage } from './SnackBarMessage';

@Component({
    selector: 'notification-component',
    templateUrl: 'NotificationComponent.html'
})
export class NotificationComponent {
    public instance: MatSnackBarRef<NotificationComponent>;

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarMessage) {
    }
}
