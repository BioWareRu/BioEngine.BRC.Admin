import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AutocompleteInputComponent} from './AutocompleteInputComponent';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ErrorStateMatcher, MatAutocompleteSelectedEvent} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {FormInput} from './FormInput';
import {IBaseServiceCreatable} from '../../BaseService';

@Component({
    selector: 'chips-input',
    templateUrl: './ChipsInputComponent.html',
})
export class ChipsInputComponent extends AutocompleteInputComponent implements OnInit {
    @Input() public Creatable = false;
    @Input() public Removable = true;
    @Input() public Selectable = true;
    @Input() public Visible = true;
    @Input() public EntitiesService: IBaseServiceCreatable<any> = null;
    @ViewChild('newInput') newInput: ElementRef<HTMLInputElement>;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    matcher: ChipsErrorStateMatcher;
    public addInProgress = false;

    selected(event: MatAutocompleteSelectedEvent): void {
        const values = this.Control.value || [];
        values.push(event.option.value);
        this.Control.setValue(values);
        this.buildGroups(this.Options);

    }

    ngOnInit(): void {
        this.RemoveSelectedValues = true;
        super.ngOnInit();
        this.matcher = new ChipsErrorStateMatcher(this);
    }

    remove(value): void {
        const index = this.Control.value.indexOf(value);

        if (index >= 0) {
            this.Control.value.splice(index, 1);
            if (this.Control.value.length === 0) {
                this.Control.setValue(null);
            }
            this.buildGroups(this.Options);
        }
    }

    add(value): void {
        if (!this.Creatable || !value || !value.value) {
            return;
        }
        this.addInProgress = true;
        this.EntitiesService.create(value.value).subscribe(result => {
            let values = this.Control.value;
            if (!values) {
                values = [];
            }
            values.push(result.Model[this.ValueField]);
            this.Control.setValue(values);
            this.Options.push(result.Model);
            this.buildGroups(this.Options);
            this.buildLabels();
            this.newInput.nativeElement.value = null;
            this.addInProgress = false;
        });
    }

    inputClosed(): void {
        this.Control.setValue(this.Control.value);
    }

    protected isValueSelected(value: any): boolean {
        return value && this.Control.value && this.Control.value.indexOf(value) > -1;
    }
}

class ChipsErrorStateMatcher extends ErrorStateMatcher {
    constructor(private _input: FormInput) {
        super();
    }

    public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return this._input.Errors.length > 0;
    }
}
