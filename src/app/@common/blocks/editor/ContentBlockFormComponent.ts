import { BaseContentBlock } from 'app/@models/blocks/ContentBlock';

import { SimpleFormComponent } from 'app/@common/forms/FormComponent';

import { OnInit, OnDestroy, Input } from '@angular/core';

import { BlocksManager } from '../BlocksManager';

export abstract class ContentBlockFormComponent<TBlock extends BaseContentBlock>
    extends SimpleFormComponent<TBlock>
    implements OnInit, OnDestroy {
    @Input()
    public blocksManager: BlocksManager;
    ngOnDestroy(): void {
        this.getFields().forEach(field => {
            this.Form.FormGroup.removeControl(this.getFieldName(field.name));
        });
    }

    public getFieldName(field: string): string {
        return `${field}${this.Model.Id}`;
    }

    protected constructForm(): void {
        this.getFields().forEach(element => {
            this.registerFormControl(
                this.getFieldName(element.name),
                element.validators,
                element.property
            );
        });
    }

    protected abstract getFields(): BlockFieldDescriptor[];
    public abstract isEmpty(): boolean;

    protected afterInit(): void {
        if (this.Model.InFocus) {
            this.setFocus();
        }
    }
    protected setFocus(): void {
        return;
    }

    public processChange(key: string, oldValue: any, newValue: any): void {}
}

export class BlockFieldDescriptor {
    public constructor(
        public name: string,
        public validators: any[],
        public property: string = null
    ) {}
}
