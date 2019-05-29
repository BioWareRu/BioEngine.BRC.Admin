import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { TwitterBlock } from '@models/blocks/TwitterBlock';
import { AbstractContentBlockFormComponent } from './abstract-content-block-form-component';
import { BlockFieldDescriptor } from "./BlockFieldDescriptor";
import { CustomValidators } from 'ngx-custom-validators';
import { FieldInputChange } from "@common/forms/FieldInputChange";
import * as url from 'url';

@Component({
    selector: 'twitter-block-form',
    template: `
        <text-input
                *ngIf="editMode"
                [inputFormGroup]="form.formGroup"
                [inputFieldName]="getFieldName('tweetUrl')"
                inputLabel="Адрес твита"
        ></text-input>
        <div *ngIf="!editMode" fxLayout="row" fxLayoutAlign="center center">
            <div id="twitter-{{this.model.id}}"></div>
            <icon classes="editUrl" iconName="fa-edit" (click)="edit()"></icon>
        </div>
    `,
    styles: [`
        icon.editUrl {
            position: absolute;
            right: 5px;
            top: 5px;
            cursor: pointer;
            opacity: 0.3;
        }
    `]
})
export class TwitterBlockFormComponent extends AbstractContentBlockFormComponent<TwitterBlock> implements OnInit {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    public editMode = true;

    private _statusIdRegex = /\/(.*)\/status(es)?\/(\d+)/;

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [new BlockFieldDescriptor('tweetUrl', [Validators.required, CustomValidators.url], 'data.tweetUrl')];
    }

    public ngOnInit(): void {
        this.model.data.tweetUrl = 'https://twitter.com/' + this.model.data.tweetAuthor + '/status/' + this.model.data.tweetId;
        super.ngOnInit();
    }

    public isEmpty(): boolean {
        return TwitterBlock.isEmpty(this.model);
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
            if (change.key === this.getFieldName('tweetUrl')) {

                const info = this._getTweetInfo(change.newValue);
                console.log(info);
                if (info !== null) {
                    this.model.data.tweetId = info.id;
                    this.model.data.tweetAuthor = info.author;
                    this.editMode = false;
                    setTimeout(() => {
                        this._render();
                    }, 10);
                }
            }
        });
    }

    private _getTweetInfo(uri: string): TweetInfo | null {
        const parsed = url.parse(uri);
        console.log(parsed);
        if (parsed.host !== 'twitter.com') {
            return null;
        }

        if (!parsed.path) {
            return null;
        }

        if (parsed.path.indexOf('status') === -1) {
            return null;
        }

        const match = this._statusIdRegex.exec(parsed.path);
        console.log(match);
        if (match === null) {
            return null;
        }

        return new TweetInfo(match[3], match[1]);
    }

    private _render(): void {
        twttr.ready(twitter => {
            twitter.widgets.createTweet(
                this.model.data.tweetId + '',
                <HTMLElement>document.getElementById('twitter-' + this.model.id),
                {
                    theme: 'light'
                }
            );
        });
    }

    public edit(): void {
        this.editMode = true;
    }
}

class TweetInfo {
    public constructor(public id: string, public author: string) {

    }
}
