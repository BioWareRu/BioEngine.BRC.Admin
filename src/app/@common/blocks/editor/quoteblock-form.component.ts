import { Component, ElementRef, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { BlockFieldDescriptor, AbstractContentBlockFormComponent } from './abstract-content-block-form-component';
import { QuoteBlock } from '@models/blocks/QuoteBlock';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
    selector: 'quote-block-form',
    template: `
        <div [formGroup]="form.formGroup">
        <div >
            <ckeditor
                    #editor
                    [editor]="editorInstance"
                    [formControlName]="getFieldName('text')"
            ></ckeditor>
            </div>
            <hr />
            <div fxLayout="row wrap"
            fxLayoutGap="grid">
            <text-input [inputFormGroup]="form.formGroup"
            [inputFieldName]="getFieldName('author')"
            inputLabel="Автор" fxFlex=40 style="margin-right: 10%"></text-input>
            <text-input [inputFormGroup]="form.formGroup"
            [inputFieldName]="getFieldName('link')"
            inputLabel="Ссылка"  fxFlex=40></text-input></div>

        </div>
    `,
    styles: [
        `
            :host {
                background: #ececec;
                display: block;
                padding: 10px;
            }
            .ck.ck-editor__editable_inline > :last-child {
                margin-bottom: 5px;
            }

            .ck.ck-editor__editable_inline > :first-child {
                margin-top: 5px;
            }
        `
    ]
})

export class QuoteBlockFormComponent extends AbstractContentBlockFormComponent<QuoteBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    public editorInstance = BalloonEditor;
    view: any;
    focusOnReady: boolean;

    splitSymbol = '‌‌\u200C';

    @ViewChild('editor') editorElement: ElementRef<HTMLElement>;

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [
            new BlockFieldDescriptor('text', [Validators.required], 'data.text'),
            new BlockFieldDescriptor('author', [], 'data.author'),
            new BlockFieldDescriptor('link', [CustomValidators.url], 'data.link')
        ];
    }

    public isEmpty(): boolean {
        return this.model.data.text === '' || this.model.data.text === '<p>&nbsp;</p>';
    }

    protected _setFocus(): void {
        this.focus();
    }

    focus(): void {
        this.focusOnReady = true;
    }
}
