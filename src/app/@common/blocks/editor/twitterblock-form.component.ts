import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { TwitterBlock } from '@models/blocks/TwitterBlock';
import { BlockFieldDescriptor, AbstractContentBlockFormComponent } from './abstract-content-block-form-component';

@Component({
    selector: 'twitter-block-form',
    template: `
        <text-input
                [inputFormGroup]="form.formGroup"
                [inputFieldName]="getFieldName('TwitID')"
                inputLabel="Номер твита"
        ></text-input>
    `,
    styles: [``]
})
export class TwitterBlockFormComponent extends AbstractContentBlockFormComponent<TwitterBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [new BlockFieldDescriptor('TwitID', [Validators.required], 'data.twitId')];
    }

    public isEmpty(): boolean {
        return !this.model.data.twitId || this.model.data.twitId > 0;
    }
}
