import { Component, ElementRef, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { AbstractEditorBlockFormComponent } from '@common/blocks/editor/abstract-editor-block-form-component';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { BlockFieldDescriptor } from './BlockFieldDescriptor';
import { QuoteBlock } from '@models/blocks/QuoteBlock';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
    selector: 'quote-block-form',
    template: `
        <div [formGroup]="form.formGroup">
            <div>
                <ckeditor
                        #editor
                        [editor]="editorInstance"
                        [config]="editorConfig"
                        [formControlName]="getFieldName('text')"
                ></ckeditor>
            </div>
            <hr/>
            <div fxLayout="row wrap"
                 fxLayoutGap="grid">
                <text-input [inputFormGroup]="form.formGroup"
                            [inputFieldName]="getFieldName('author')"
                            inputLabel="Автор" fxFlex=40 style="margin-right: 10%"></text-input>
                <text-input [inputFormGroup]="form.formGroup"
                            [inputFieldName]="getFieldName('link')"
                            inputLabel="Ссылка" fxFlex=40></text-input>
            </div>

        </div>
    `,
    styles: [
        `
            .ck.ck-editor__editable_inline > :last-child {
                margin-bottom: 5px;
            }

            .ck.ck-editor__editable_inline > :first-child {
                margin-top: 5px;
            }
        `
    ]
})

export class QuoteBlockFormComponent extends AbstractEditorBlockFormComponent<QuoteBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    view: any;
    focusOnReady: boolean;

    @ViewChild('editor', { static: true }) editorElement: ElementRef<HTMLElement>;

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
