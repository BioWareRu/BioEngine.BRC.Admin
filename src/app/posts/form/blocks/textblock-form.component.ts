import { CKEInputComponent } from './../../../@common/forms/fields/CKEInputComponent';
import { TextBlock, TextBlockData } from 'app/@models/TextBlock';
import { Validators } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { PostBlockFormComponent } from '../form.component';
import { Model } from 'app/@models/base/Model';
import { ContentBlockItemType } from 'app/@models/Post';

@Component({
    selector: 'text-block-form',
    template: `
        <cke-input
            #editor
            [FormGroup]="FormGroup"
            [FieldName]="getFieldName('Text')"
            Label="Текст"
            [blockMode]="true"
        ></cke-input>
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
export class TextBlockFormComponent extends PostBlockFormComponent<TextBlock> {
    constructor(snackBarService: SnackBarService) {
        super(snackBarService);
    }

    @ViewChild(CKEInputComponent) cke: CKEInputComponent;
    @ViewChild('editor') editor: ElementRef<HTMLElement>;

    protected constructForm(): void {
        this.registerFormControl(
            this.getFieldName('Text'),
            [<any>Validators.required],
            'Data.Text'
        );
    }

    protected afterInit(): void {
        super.afterInit();
        this.cke.onDelete.subscribe(() => {
            this.blocksManager.RemoveBlock(this.Model);
            this.blocksManager.Update();
        });
        this.cke.onSplit.subscribe((splitSymbol: string) => {
            const parts = this.Model.Data.Text.split(splitSymbol);
            const id = this.getFieldName('Text');
            this.FormGroup.get(id).setValue(parts[0]);
            const nextBlock = this.blocksManager.CreateBlock<TextBlock>(ContentBlockItemType.Text);
            nextBlock.Data.Text = parts[1];
            nextBlock.InFocus = true;
            this.blocksManager.AddBlock(nextBlock, this.Model);
            // this.blocksManager.AddBlock(
            //     this.blocksManager.CreateBlock(ContentBlockItemType.Text),
            //     this.Model
            // );
            this.blocksManager.Update();
            // this.postFormComponent.addBlock(ContentBlockItemType.Text, new TextBlockData());
            // data.Text = parts[1];
            // this.postFormComponent.addBlock(ContentBlockItemType.Text, data);
            // this.Model.Data.Text = parts[0];
            // console.log('split', parts);
        });
    }

    protected setFocus(): void {
        this.cke.focus();
    }
}
