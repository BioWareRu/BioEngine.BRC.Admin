import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { CutBlock } from '@models/blocks/CutBlock';
import { AbstractContentBlockFormComponent } from './abstract-content-block-form-component';
import { BlockFieldDescriptor } from './BlockFieldDescriptor';

@Component({
    selector: 'cut-block-form',
    template: `
        <text-input
                [inputFormGroup]="form.formGroup"
                [inputFieldName]="getFieldName('buttonText')"
                inputLabel="Текст кнопки"
        ></text-input>
    `,
    styles: [``]
})
export class CutBlockFormComponent extends AbstractContentBlockFormComponent<CutBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [new BlockFieldDescriptor('buttonText', [Validators.required], 'data.buttonText')];
    }

    public isEmpty(): boolean {
        return false;
    }
}
