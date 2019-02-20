import { CKEInputComponent } from './../../../@common/forms/fields/CKEInputComponent';
import { TextBlock } from 'app/@models/posts/TextBlock';
import { Validators } from '@angular/forms';
import { Component, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { PostBlockFormComponent, BlockFieldDescriptor } from '../form.component';
import { ContentBlockItemType } from 'app/@models/posts/Post';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

@Component({
    selector: 'text-block-form',
    template: `
        <div [formGroup]="FormGroup">
            <ckeditor
                #editor
                [editor]="Editor"
                [formControlName]="getFieldName('Text')"
                (change)="onChange($event)"
                (ready)="ready($event)"
            ></ckeditor>
        </div>
        <ng-container *ngIf="isEmpty()">
            <button class="addBlock" mat-icon-button [matMenuTriggerFor]="menu">
                <icon iconName="fa-plus"></icon>
            </button>
            <mat-menu #menu="matMenu">
                <ng-container *ngFor="let config of blocksManager.Types.Values()">
                    <button
                        *ngIf="config.type !== this.Model.Type"
                        mat-menu-item
                        (click)="
                            blocksManager.ReplaceBlock(
                                this.Model,
                                blocksManager.CreateBlock(config.type)
                            )
                        "
                    >
                        <icon [icon]="config.icon"></icon>
                        <span>{{ config.title }}</span>
                    </button></ng-container
                >
            </mat-menu>
        </ng-container>
    `,
    styles: [
        `
            .ck.ck-editor__editable_inline > :last-child {
                margin-bottom: 5px;
            }
            .ck.ck-editor__editable_inline > :first-child {
                margin-top: 5px;
            }
            .addBlock {
                position: absolute;
                top: -6px;
                left: -50px;
            }
        `
    ]
})
export class TextBlockFormComponent extends PostBlockFormComponent<TextBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }
    public Editor = BalloonEditor;
    view: any;
    focusOnReady: boolean;

    splitSymbol = '‌‌\u200C';

    @ViewChild(CKEInputComponent) cke: CKEInputComponent;
    @ViewChild('editor') editor: ElementRef<HTMLElement>;

    protected getFields(): BlockFieldDescriptor[] {
        return [new BlockFieldDescriptor('Text', [Validators.required], 'Data.Text')];
    }

    private onDelete(): void {
        this.blocksManager.RemoveBlock(this.Model);
        this.blocksManager.Update();
    }

    private onSplit(): void {
        const parts = this.Model.Data.Text.split(this.splitSymbol);
        const id = this.getFieldName('Text');
        this.FormGroup.get(id).setValue(parts[0]);
        const nextBlock = this.blocksManager.CreateBlock<TextBlock>(ContentBlockItemType.Text);
        nextBlock.Data.Text = parts[1];
        nextBlock.InFocus = true;
        this.blocksManager.AddBlock(nextBlock, this.Model);
        this.blocksManager.Update();
    }

    public isEmpty(): boolean {
        return this.Model.Data.Text === '' || this.Model.Data.Text === '<p>&nbsp;</p>';
    }

    protected setFocus(): void {
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
                this.onSplit();
            }
        });
        editor.keystrokes.set('backspace', (keyEvtData, cancel) => {
            if (this.isEmpty) {
                this.onDelete();
            }
        });
    }

    public onChange({ editor }: ChangeEvent): void {
        const data = editor.getData();
    }

    focus(): void {
        this.focusOnReady = true;
    }
}
