import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Inject} from '@angular/core';

export abstract class DialogComponent<T> {
    public dialogRef: MatDialogRef<DialogComponent<T>>;

    protected constructor(
        @Inject(MAT_DIALOG_DATA) public data: T) {
    }

    hideDialog(): void {
        this.dialogRef.close();
    }
}
