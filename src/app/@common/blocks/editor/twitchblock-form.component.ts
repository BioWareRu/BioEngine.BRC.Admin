import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { CustomValidators } from 'ngx-custom-validators';
import { BlockFieldDescriptor, AbstractContentBlockFormComponent } from './abstract-content-block-form-component';
import { TwitchBlock } from '@models/blocks/TwitchBlock';
import { FieldInputChange } from '@common/forms/Form';
import * as URLParse from 'url-parse';

declare var Twitch: any;

@Component({
    selector: 'twitch-block-form',
    template: `
        <text-input
                *ngIf="editMode"
                [inputFormGroup]="form.formGroup"
                [inputFieldName]="getFieldName('videoUrl')"
                inputLabel="Url видео"
        ></text-input>
        <div *ngIf="!editMode" style="text-align:center">
            <div id="twitch-{{model.id}}"></div>
            <icon classes="editUrl" iconName="fa-edit" (click)="edit()"></icon>
        </div>
    `,
    styleUrls: [`./youtubeblock-form.component.scss`]
})
export class TwitchBlockFormComponent extends AbstractContentBlockFormComponent<TwitchBlock> implements OnInit {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    public editMode = true;

    public ngOnInit(): void {
        let url = 'https://player.twitch.tv/';
        if (this.model.data.videoId) {
            url += '?video=' + this.model.data.videoId;
        } else if (this.model.data.collectionId) {
            url += '?collection=' + this.model.data.collectionId;
        } else if (this.model.data.channelId) {
            url += '?channel=' + this.model.data.channelId;
        }
        this.model.data.videoUrl = url;
        super.ngOnInit();
    }

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [
            new BlockFieldDescriptor(
                'videoUrl',
                [Validators.required, CustomValidators.url],
                'data.videoUrl'
            )
        ];
    }

    protected _afterInit(): void {
        super._afterInit();
        if (!this.isEmpty()) {
            this.editMode = false;
            setTimeout(() => {
                this._render();
            }, 10);
        }
        this.form.onChange.subscribe((change: FieldInputChange) => {
            if (change.key === this.getFieldName('videoUrl')) {
                const url = new URLParse(change.newValue, true);
                if (url.host === 'player.twitch.tv') {
                    if (url.query['video'] !== undefined) {
                        this.model.data.videoId = <string>url.query['video'];
                        this.model.data.channelId = '';
                        this.model.data.collectionId = '';
                    } else if (url.query['channel'] !== undefined) {
                        this.model.data.videoId = '';
                        this.model.data.channelId = <string>url.query['channel'];
                        this.model.data.collectionId = '';
                    } else if (url.query['collection'] !== undefined) {
                        this.model.data.videoId = '';
                        this.model.data.channelId = '';
                        this.model.data.collectionId = <string>url.query['collection'];
                    } else {
                        return;
                    }
                    this.editMode = false;
                    setTimeout(() => {
                        this._render();
                    }, 10);
                }
            }
        });
    }

    private _render(): void {
        const params: any = {
            width: 854,
            height: 480,
            layout: 'video',
            autoplay: false
        };
        if (this.model.data.videoId) {
            params.videoId = this.model.data.videoId;
        } else if (this.model.data.channelId) {
            params.channel = this.model.data.channelId;
        } else if (this.model.data.collectionId) {
            params.collection = this.model.data.collectionId;
        }
        return new Twitch.Player('twitch-' + this.model.id, params);
    }

    public isEmpty(): boolean {
        return TwitchBlock.isEmpty(this.model);
    }

    public edit(): void {
        this.editMode = true;
    }
}
