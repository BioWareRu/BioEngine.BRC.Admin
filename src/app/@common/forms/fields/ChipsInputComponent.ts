import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatAutocompleteSelectedEvent } from '@angular/material';
import { IBaseServiceCreatable } from '../../abstract-base-service';
import { AutocompleteInputComponent } from './AutocompleteInputComponent';
import { AbstractFormInput } from './abstract-form-input';

@Component({
    selector: 'chips-input',
    templateUrl: './ChipsInputComponent.html'
})
export class ChipsInputComponent extends AutocompleteInputComponent implements OnInit {
    @Input() public creatable = false;
    @Input() public removable = true;
    @Input() public selectable = true;
    @Input() public visible = true;
    @Input() public entitiesService: IBaseServiceCreatable<any> | null = null;
    @ViewChild('newInput') newInput: ElementRef<HTMLInputElement>;
    separatorKeysCodes: Array<number> = [ENTER, COMMA];
    matcher: ChipsErrorStateMatcher;
    public addInProgress = false;

    selected(event: MatAutocompleteSelectedEvent): void {
        const values = this.control.value || [];
        values.push(event.option.value);
        this.control.setValue(values);
        this._buildGroups();

    }

    ngOnInit(): void {
        this._removeSelectedValues = true;
        super.ngOnInit();
        this.matcher = new ChipsErrorStateMatcher(this);
    }

    remove(value): void {
        const index = this.control.value.indexOf(value);

        if (index >= 0) {
            this.control.value.splice(index, 1);
            if (this.control.value.length === 0) {
                this.control.setValue(null);
            }
            this._buildGroups();
        }
    }

    add(value): void {
        if (!this.creatable || !value || !value.value) {
            return;
        }
        this.addInProgress = true;
        if (this.entitiesService) {
            this.entitiesService.create(value.value).subscribe(result => {
                let values = this.control.value;
                if (!values) {
                    values = [];
                }
                values.push(result.model[this.valueField]);
                this.control.setValue(values);
                this._values.push(result.model);
                this._buildGroups();
                this._buildLabels();
                this.newInput.nativeElement.value = '';
                this.addInProgress = false;

            });
        }
    }

    inputClosed(): void {
        this.control.setValue(this.control.value);
    }

    protected _isValueSelected(value: any): boolean {
        return value && this.control.value && Array.isArray(this.control.value) && this.control.value.indexOf(value) > -1;
    }
}

class ChipsErrorStateMatcher extends ErrorStateMatcher {
    constructor(private readonly _input: AbstractFormInput) {
        super();
    }

    public isErrorState(_control: FormControl | null, _form: FormGroupDirective | NgForm | null): boolean {
        return this._input.errors.length > 0;
    }
}
