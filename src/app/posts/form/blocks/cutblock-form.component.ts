import { Validators } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { PostBlockFormComponent } from '../form.component';
import { CutBlock } from 'app/@models/posts/CutBlock';

@Component({
    selector: 'cut-block-form',
    template: ``,
    styles: [``]
})
export class CutBlockFormComponent extends PostBlockFormComponent<CutBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    protected constructForm(): void {
        this.registerFormControl(
            this.getFieldName('Title'),
            [<any>Validators.required],
            'Data.Title'
        );
    }
}
