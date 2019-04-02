import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldInputChange } from '@common/forms/Form';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { YoutubeBlock } from '@models/blocks/YoutubeBlock';
import { CustomValidators } from 'ngx-custom-validators';
import { BlockFieldDescriptor, AbstractContentBlockFormComponent } from './abstract-content-block-form-component';

@Component({
    selector: 'youtube-block-form',
    template: `
        <text-input
                *ngIf="editMode"
                [inputFormGroup]="form.formGroup"
                [inputFieldName]="getFieldName('youtubeUrl')"
                inputLabel="Url видео"
        ></text-input>
        <div *ngIf="!editMode" style="text-align:center">
            <iframe
                    frameborder="0"
                    height="315"
                    [src]="model.data.youtubeUrl | safe"
                    width="560"
            ></iframe>
            <icon classes="editUrl" iconName="fa-edit" (click)="edit()"></icon>
        </div>
    `,
    styleUrls: [`./youtubeblock-form.component.scss`]
})
export class YoutubeBlockFormComponent extends AbstractContentBlockFormComponent<YoutubeBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    public editMode = true;

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [
            new BlockFieldDescriptor(
                'youtubeUrl',
                [Validators.required, CustomValidators.url],
                'data.youtubeUrl'
            )
        ];
    }

    protected _afterInit(): void {
        super._afterInit();
        if (this.model.data.youtubeId) {
            this._updateUrl();
            this.editMode = false;
        }
        this.form.onChange.subscribe((change: FieldInputChange) => {
            if (change.key === this.getFieldName('youtubeUrl')) {
                const id = this._youTubeGetID(change.newValue);
                if (id) {
                    this.model.data.youtubeId = id;
                    this._updateUrl();
                    this.editMode = false;
                }
            }
        });
    }

    private _updateUrl(): void {
        this.form.getControlByProperty('data.youtubeUrl').patchValue(this._getUrl());
    }

    private _youTubeGetID(url: string): string | null {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);

        return match && match[7].length === 11 ? match[7] : null;
    }

    private _getUrl(): string {
        return 'https://www.youtube.com/embed/' + this.model.data.youtubeId;
    }

    public isEmpty(): boolean {
        return this.model.data.youtubeId === '';
    }

    public edit(): void {
        this.editMode = true;
    }
}
