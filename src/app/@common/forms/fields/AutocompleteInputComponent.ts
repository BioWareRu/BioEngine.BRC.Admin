import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material';
import { Observable } from 'rxjs';
import Dictionary from '../../Dictionary';
import { AbstractFormInput } from './abstract-form-input';

@Component({
    selector: 'autocomplete-input',
    templateUrl: './AutocompleteInputComponent.html'
})
export class AutocompleteInputComponent extends AbstractFormInput implements OnInit {
    public groups: Array<SelectGroup> = [];
    @Input() public options: Array<any> | Observable<any>;
    @Input() public groupField: string | null = '';
    @Input() public titleField = 'title';
    @Input() public valueField = 'value';
    @Input() public type = 'text';
    @ViewChild(MatAutocompleteTrigger)
    autoCompleteTrigger: MatAutocompleteTrigger;
    @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;
    protected _removeSelectedValues = false;
    protected _labels = new Dictionary<number, string>();
    protected _values: Array<any> = [];
    private _filter: string;
    public isInitialized = false;

    public ngOnInit(): void {
        super.ngOnInit();
        if (!this.options) {
            throw new Error('Empty options for field ' + this.inputFieldName);
        }
        if (Array.isArray(this.options)) {
            this._values = this.options;
            this._buildGroups();
            this._buildLabels();
            this.isInitialized = true;
        } else {
            this.options.subscribe(data => {
                this._values = data;
                this._buildGroups();
                this._buildLabels();
                this.isInitialized = true;
            });
        }
    }

    // noinspection JSMethodCanBeStatic
    public displayFn(item: any): string | null {
        return item !== null && this._labels && this._labels.hasKey(item)
            ? this._labels.get(item)
            : null;
    }

    public onSearchChange(input: EventTarget): void {
        this._filter = (<HTMLInputElement>input).value.toLowerCase();
        this._buildGroups();
    }

    protected _buildLabels(): void {
        this._labels.clear();
        this._values.forEach(option => {
            this._labels.set(option[this.valueField], option[this.titleField]);
        });
    }

    protected _buildGroups(): void {
        const groups: Array<SelectGroup> = [];

        if (this.groupField === null) {
            groups.push(new SelectGroup());
        }
        this._values.forEach(option => {
            const selectOption = new SelectOption();
            selectOption.title = option[this.titleField];
            selectOption.value = option[this.valueField];

            if (
                this._removeSelectedValues &&
                this._isValueSelected(selectOption.value)
            ) {
                return;
            }
            if (
                this._filter &&
                selectOption.title.toLowerCase().indexOf(this._filter) === -1
            ) {
                return;
            }
            if (this.groupField === null) {
                groups[0].options.push(selectOption);
            } else {
                let group: SelectGroup | null = null;
                const groupTitle = option[this.groupField];
                groups.forEach(selectGroup => {
                    if (selectGroup.title === groupTitle) {
                        group = selectGroup;
                    }
                });
                if (group === null) {
                    group = new SelectGroup();
                    group.title = groupTitle;
                    groups.push(group);
                }
                group.options.push(selectOption);
            }
        });
        this.groups = groups;
    }

    protected _isValueSelected(value: any): boolean {
        // noinspection TsLint
        return this.control.value === value;
    }
}

export class SelectGroup {
    public options: Array<SelectOption> = [];
    public title: string | null = '';
}

export class SelectOption {
    public title: string;
    public value: any;
}
