import { Validators } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { PostBlockFormComponent } from '../form.component';
import { TwitterBlock } from 'app/@models/posts/TwitterBlock';

@Component({
    selector: 'twitter-block-form',
    template: ``,
    styles: [``]
})
export class TwitterBlockFormComponent extends PostBlockFormComponent<TwitterBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    protected constructForm(): void {
        this.registerFormControl(
            this.getFieldName('TwitID'),
            [<any>Validators.required],
            'Data.TwitId'
        );
    }
}
