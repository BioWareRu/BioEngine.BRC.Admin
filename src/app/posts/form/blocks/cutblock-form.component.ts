import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { PostBlockFormComponent, BlockFieldDescriptor } from '../form.component';
import { CutBlock } from 'app/@models/posts/CutBlock';

@Component({
    selector: 'cut-block-form',
    template: `
        <text-input
            [FormGroup]="FormGroup"
            [FieldName]="getFieldName('ButtonText')"
            Label="Текст кнопки"
        ></text-input>
    `,
    styles: [``]
})
export class CutBlockFormComponent extends PostBlockFormComponent<CutBlock> {
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
