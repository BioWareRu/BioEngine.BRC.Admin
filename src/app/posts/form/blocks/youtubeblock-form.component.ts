import { CustomValidators } from 'ngx-custom-validators';
import { Validators } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { PostBlockFormComponent } from '../form.component';
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

    protected constructForm(): void {
        this.registerFormControl(
            this.getFieldName('Url'),
            [Validators.required, CustomValidators.url],
            'Data.Url'
        );
    }
}
