import { SimpleFormComponent } from 'app/@common/forms/FormComponent';
import { TextBlock } from 'app/@models/TextBlock';
import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';

@Component({
    selector: 'text-block-form',
    template: `
        <cke-input
            [FormGroup]="formGroup"
            FieldName="Text"
            Label="Текст"
        ></cke-input>
    `
})
export class TextBlockFormComponent extends SimpleFormComponent<TextBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    protected constructForm(): void {
        this.registerFormControl(
            'Text',
            [<any>Validators.required],
            'Data.Text'
        );
    }
}
