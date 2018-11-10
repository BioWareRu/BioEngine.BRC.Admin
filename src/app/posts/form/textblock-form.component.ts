import { TextBlock } from 'app/@models/TextBlock';
import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { PostBlockFormComponent } from './form.component';

@Component({
    selector: 'text-block-form',
    template: `
        <cke-input
            [FormGroup]="FormGroup"
            [FieldName]="getFieldName('Text')"
            Label="Текст"
        ></cke-input>
    `
})
export class TextBlockFormComponent extends PostBlockFormComponent<TextBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    protected constructForm(): void {
        this.registerFormControl(
            this.getFieldName('Text'),
            [<any>Validators.required],
            'Data.Text'
        );
    }
}
