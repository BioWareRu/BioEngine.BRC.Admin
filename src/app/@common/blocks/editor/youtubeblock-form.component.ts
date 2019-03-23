import { CustomValidators } from 'ngx-custom-validators';
import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { YoutubeBlock } from 'app/@models/blocks/YoutubeBlock';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldInputChange } from 'app/@common/forms/Form';
import { ContentBlockFormComponent, BlockFieldDescriptor } from './ContentBlockFormComponent';

@Component({
    selector: 'youtube-block-form',
    template: `
        <text-input
            *ngIf="editMode"
            [FormGroup]="Form.FormGroup"
            [FieldName]="getFieldName('YoutubeUrl')"
            Label="Url видео"
        ></text-input>
        <div *ngIf="!editMode" style="text-align:center">
            <iframe
                frameborder="0"
                height="315"
                [src]="Model.Data.YoutubeUrl | safe"
                width="560"
            ></iframe>
            <icon classes="editUrl" iconName="fa-edit" (click)="edit()"></icon>
        </div>
    `,
    styleUrls: [`./youtubeblock-form.component.scss`]
})
export class YoutubeBlockFormComponent extends ContentBlockFormComponent<YoutubeBlock> {
    constructor(snackBarService: SnackBarService, private sanitizer: DomSanitizer) {
        super(snackBarService);
    }

    public editMode = true;

    protected getFields(): BlockFieldDescriptor[] {
        return [
            new BlockFieldDescriptor(
                'YoutubeUrl',
                [Validators.required, CustomValidators.url],
                'Data.YoutubeUrl'
            )
        ];
    }

    protected afterInit(): void {
        super.afterInit();
        if (this.Model.Data.YoutubeId) {
            this.updateUrl();
            this.editMode = false;
        }
        this.Form.onChange.subscribe((change: FieldInputChange) => {
            if (change.key === this.getFieldName('YoutubeUrl')) {
                const id = this.YouTubeGetID(change.newValue);
                if (id) {
                    this.Model.Data.YoutubeId = id;
                    this.updateUrl();
                    this.editMode = false;
                }
            }
        });
    }

    private updateUrl(): void {
        this.Form.getControlByProperty('Data.YoutubeUrl').patchValue(this.GetUrl());
    }

    private YouTubeGetID(url: string): string {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[7].length === 11 ? match[7] : null;
    }

    private GetUrl(): string {
        return 'https://www.youtube.com/embed/' + this.Model.Data.YoutubeId;
    }

    public isEmpty(): boolean {
        return this.Model.Data.YoutubeId === '';
    }

    public edit(): void {
        this.editMode = true;
    }
}
