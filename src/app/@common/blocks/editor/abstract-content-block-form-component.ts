import { Input, OnDestroy, OnInit } from '@angular/core';

import { AbstractSimpleFormComponent } from '@common/forms/abstract-form-component';
import { AbstractBaseContentBlock } from '@models/blocks/abstract-content-block';

import { BlocksManager } from '../BlocksManager';

export abstract class AbstractContentBlockFormComponent<TBlock extends AbstractBaseContentBlock>
    extends AbstractSimpleFormComponent<TBlock>
    implements OnInit, OnDestroy {
    @Input()
    public blocksManager: BlocksManager;

    ngOnDestroy(): void {
        this._getFields().forEach(field => {
            this.form.formGroup.removeControl(this.getFieldName(field.name));
        });
    }

    public getFieldName(field: string): string {
        return `${field}${this.model.id}`;
    }

    protected _constructForm(): void {
        this._getFields().forEach(element => {
            this.registerFormControl(
                this.getFieldName(element.name),
                element.validators,
                element.property
            );
        });
    }

    protected abstract _getFields(): Array<BlockFieldDescriptor>;

    public abstract isEmpty(): boolean;

    protected _afterInit(): void {
        if (this.model.inFocus) {
            this._setFocus();
        }
    }

    protected _setFocus(): void {
        return;
    }
}

export class BlockFieldDescriptor {
    public constructor(
        public name: string,
        public validators: Array<any>,
        public property = ''
    ) {
    }
}
