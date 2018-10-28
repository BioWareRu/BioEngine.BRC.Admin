import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormInput} from './FormInput';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material';

@Component({
    selector: 'autocomplete-input',
    templateUrl: './AutocompleteInputComponent.html',
})
export class AutocompleteInputComponent extends FormInput implements OnInit {
    public groups: SelectGroup[] = [];
    @Input() public Options: any[] = [];
    @Input() public GroupField: string = null;
    @Input() public TitleField = 'title';
    @Input() public ValueField = 'value';
    @Input() public Type = 'text';
    @ViewChild(MatAutocompleteTrigger) AutoCompleteTrigger: MatAutocompleteTrigger;
    @ViewChild(MatAutocomplete) MatAutocomplete: MatAutocomplete;
    protected RemoveSelectedValues = false;
    protected Labels: { [key: number]: string; } = null;

    public ngOnInit(): void {
        super.ngOnInit();
        this.buildGroups(this.Options);
        this.buildLabels();
    }

    // noinspection JSMethodCanBeStatic
    public displayFn(item: any): string {
        return item !== null && this.Labels.hasOwnProperty(item) ? this.Labels[item] : undefined;
    }

    public onSearchChange(input: string): void {
        input = input.toLowerCase();
        const filteredOptions = this.Options.filter(option => option[this.TitleField].toLowerCase().indexOf(input) !== -1);
        this.buildGroups(filteredOptions);
    }

    protected buildLabels(): void {
        const labels: { [key: number]: string; } = {};
        this.Options.forEach(option => {
            labels[option[this.ValueField]] = option[this.TitleField];
        });
        this.Labels = labels;
    }

    protected buildGroups(options: any[]): void {
        const groups: SelectGroup[] = [];

        if (this.GroupField === null) {
            groups.push(new SelectGroup());
        }
        options.forEach(option => {
            const selectOption = new SelectOption();
            selectOption.title = option[this.TitleField];
            selectOption.value = option[this.ValueField];

            if (this.RemoveSelectedValues && this.isValueSelected(selectOption.value)) {
                return;
            }
            if (this.GroupField === null) {
                groups[0].options.push(selectOption);
            }
            else {
                let group: SelectGroup = null;
                const groupTitle = option[this.GroupField];
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

    protected isValueSelected(value: any): boolean {
        // noinspection TsLint
        return this.Control.value == value;
    }
}

export class SelectGroup {
    public options: SelectOption[] = [];
    public title: string = null;
}

export class SelectOption {
    public title: string;
    public value: any;
}
