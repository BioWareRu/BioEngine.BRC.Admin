import {Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material';
import {BioFormControl} from '../BioFormControl';

export abstract class FormInput implements OnInit {
    public Control: BioFormControl;

    @Input() public FieldName: string;
    @Input() public Label: string;
    @Input() public FormGroup: FormGroup;
    @Input() public Appearance: MatFormFieldAppearance = 'standard';
    @Input() public FxFlex = 100;
    @Input() public Placeholder: string = null;
    @Input() public Icon: string = null;
    public Errors: string[] = [];

    ngOnInit(): void {
        this.Control = <BioFormControl>this.FormGroup.get(this.FieldName);
        if (!this.Placeholder) {
            this.Placeholder = this.Label;
        }
        this.Control.valueChanges.subscribe(() => {
            this.buildErrors();
        });
        this.Control.OnErrorsChanged.subscribe(() => this.buildErrors());
    }

    protected buildErrors(): void {
        const errors = [];

        if (this.Control && (!this.Control.valid || this.Control.ServerErrors.length > 0)) {
            if (this.Control.errors) {
                if (this.Control.errors['required']) {
                    errors.push('Поле обязательно для заполнения');
                }
                if (this.Control.errors['url']) {
                    errors.push('Значение должно являться корректным URL');
                }
            }
            if (this.Control.ServerErrors.length > 0) {
                this.Control.ServerErrors.forEach(error => errors.push(error));
            }
        }
        this.Errors = errors;
    }
}
