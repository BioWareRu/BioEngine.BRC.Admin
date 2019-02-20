import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { PostBlockFormComponent, BlockFieldDescriptor } from '../form.component';
import { TwitterBlock } from 'app/@models/posts/TwitterBlock';

@Component({
    selector: 'twitter-block-form',
    template: `
        <text-input
            [FormGroup]="FormGroup"
            [FieldName]="getFieldName('TwitID')"
            Label="Номер твита"
        ></text-input>
    `,
    styles: [``]
})
export class TwitterBlockFormComponent extends PostBlockFormComponent<TwitterBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    protected getFields(): BlockFieldDescriptor[] {
        return [new BlockFieldDescriptor('TwitID', [Validators.required], 'Data.TwitId')];
    }

    public isEmpty(): boolean {
        return this.Model.Data.TwitId > 0;
    }
}
