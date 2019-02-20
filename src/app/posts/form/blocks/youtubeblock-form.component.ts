import { CustomValidators } from 'ngx-custom-validators';
import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { PostBlockFormComponent, BlockFieldDescriptor } from '../form.component';
import { YoutubeBlock } from 'app/@models/posts/YoutubeBlock';

@Component({
    selector: 'youtube-block-form',
    template: `
        <text-input
            [FormGroup]="FormGroup"
            [FieldName]="getFieldName('Url')"
            Label="Адрес видео"
        ></text-input>
    `,
    styles: [``]
})
export class YoutubeBlockFormComponent extends PostBlockFormComponent<YoutubeBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    protected getFields(): BlockFieldDescriptor[] {
        return [
            new BlockFieldDescriptor('Url', [Validators.required, CustomValidators.url], 'Data.Url')
        ];
    }

    public isEmpty(): boolean {
        return this.Model.Data.Url === '';
    }
}
