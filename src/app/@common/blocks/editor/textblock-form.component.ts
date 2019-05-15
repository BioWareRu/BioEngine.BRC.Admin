import { Component, ElementRef, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { AbstractEditorBlockFormComponent } from '@common/blocks/editor/abstract-editor-block-form-component';

import { SnackBarService } from '@common/snacks/SnackBarService';
import { ContentBlockItemType } from '@models/blocks/abstract-content-block';
import { TextBlock } from '@models/blocks/TextBlock';
import { BlockFieldDescriptor } from './abstract-content-block-form-component';

@Component({
    selector: 'text-block-form',
    template: `
        <div [formGroup]="form.formGroup">
            <ckeditor
                    #editor
                    [editor]="editorInstance"
                    [config]="editorConfig"
                    [formControlName]="getFieldName('text')"
                    (ready)="ready($event)"
            ></ckeditor>
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
export class TextBlockFormComponent extends AbstractEditorBlockFormComponent<TextBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    view: any;
    focusOnReady: boolean;

    splitSymbol = '‌‌\u200C';

    @ViewChild('editor') editorElement: ElementRef<HTMLElement>;

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [new BlockFieldDescriptor('text', [Validators.required], 'data.text')];
    }

    private _onDelete(): void {
        this.blocksManager.removeBlock(this.model);
        this.blocksManager.update();
    }

    private _onSplit(): void {
        const parts = this.model.data.text.split(this.splitSymbol);
        const id = this.getFieldName('text');
        const control = this.form.formGroup.get(id);
        if (!control) {
            throw new Error('No control for id ' + id);
        }
        control.setValue(parts[0]);
        const nextBlock = this.blocksManager.createBlock<TextBlock>(ContentBlockItemType.Text);
        nextBlock.data.text = parts[1];
        nextBlock.inFocus = true;
        this.blocksManager.addBlock(nextBlock, this.model);
        this.blocksManager.update();
    }

    public isEmpty(): boolean {
        return this.model.data.text === '' || this.model.data.text === '<p>&nbsp;</p>';
    }

    protected _setFocus(): void {
        this.focus();
    }

    public ready(editor): void {
        this.view = editor.editing.view;
        if (this.focusOnReady) {
            this.view.focus();
        }
        const model = editor.model;
        const doc = model.document;
        this.view.document.on('enter', (eventInfo, data) => {
            data.preventDefault();
            if (!data.isSoft) {
                editor.model.change(writer => {
                    const splitPos = doc.selection.getFirstRange().start;
                    writer.split(splitPos);
                    writer.setSelection(splitPos.parent.nextSibling, 'before');

                    writer.insert(
                        writer.createText(this.splitSymbol),
                        doc.selection.getFirstRange().start
                    );
                });
                eventInfo.stop();
                this._onSplit();
            }
        });
        editor.keystrokes.set('backspace', () => {
            if (this.isEmpty()) {
                this._onDelete();
            }
        });
    }

    focus(): void {
        this.focusOnReady = true;
    }
}
