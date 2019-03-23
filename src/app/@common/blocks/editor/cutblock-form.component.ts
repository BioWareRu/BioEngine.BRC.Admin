import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { CutBlock } from 'app/@models/blocks/CutBlock';
import { ContentBlockFormComponent, BlockFieldDescriptor } from './ContentBlockFormComponent';

@Component({
    selector: 'cut-block-form',
    template: `
        <text-input
            [FormGroup]="Form.FormGroup"
            [FieldName]="getFieldName('ButtonText')"
            Label="Текст кнопки"
        ></text-input>
    `,
    styles: [``]
})
export class CutBlockFormComponent extends ContentBlockFormComponent<CutBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    protected getFields(): BlockFieldDescriptor[] {
        return [new BlockFieldDescriptor('ButtonText', [Validators.required], 'Data.ButtonText')];
    }

    public isEmpty(): boolean {
        return false;
    }
}
