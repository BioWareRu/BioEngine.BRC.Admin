import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export abstract class AbstractDialogComponent<T> {
    public dialogRef: MatDialogRef<AbstractDialogComponent<T>>;

    protected constructor(
        @Inject(MAT_DIALOG_DATA) public data: T) {
    }

    hideDialog(): void {
        this.dialogRef.close();
    }
}
