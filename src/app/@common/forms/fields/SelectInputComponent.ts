import {Component, Input, OnInit} from '@angular/core';
import {FormInput} from './FormInput';

@Component({
    selector: 'select-input',
    templateUrl: './SelectInputComponent.html',
})
export class SelectInputComponent extends FormInput implements OnInit {
    public groups: SelectGroup[] = [];
    @Input() public Options: [] = [];
    @Input() public GroupField: string = null;
    @Input() public TitleField = 'title';
    @Input() public ValueField = 'value';
    @Input() public IsMultiple = false;

    public ngOnInit(): void {
        super.ngOnInit();
        if (this.GroupField === null) {
            this.groups.push(new SelectGroup());
        }
        this.Options.forEach(option => {
            const selectOption = new SelectOption();
            selectOption.title = option[this.TitleField];
            selectOption.value = option[this.ValueField];
            if (this.GroupField === null) {
                this.groups[0].options.push(selectOption);
            }
            else {
                let group: SelectGroup = null;
                const groupTitle = option[this.GroupField];
                this.groups.forEach(selectGroup => {
                    if (selectGroup.title === groupTitle) {
                        group = selectGroup;
                    }
                });
                if (group === null) {
                    group = new SelectGroup();
                    group.title = groupTitle;
                    this.groups.push(group);
                }
                group.options.push(selectOption);
            }
        });
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
