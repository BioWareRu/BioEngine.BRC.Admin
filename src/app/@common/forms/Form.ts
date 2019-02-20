import { FormGroup } from '@angular/forms';
import { BioFormControl } from './BioFormControl';
import { EventEmitter } from '@angular/core';

export class Form {
    public success = false;
    public inProgress = false;
    public hasErrors = false;
    public hasChanges = false;
    public FormGroup: FormGroup = new FormGroup({});

    protected controlsByProperty: { [p: string]: BioFormControl } = {};

    public onChange: EventEmitter<FieldInputChange> = new EventEmitter<FieldInputChange>();

    public addControl(name: string, control: BioFormControl, property: string): void {
        this.FormGroup.addControl(name, control);
        this.controlsByProperty[property] = control;
    }

    public getControlByProperty(property: string): BioFormControl {
        return this.controlsByProperty[property];
    }

    updateControlValue(name: string): void {
        (this.FormGroup.controls[name] as BioFormControl).reloadValue();
    }

    public registerChange(change: FieldInputChange): void {
        this.hasChanges = true;
        this.hasErrors = false;
        this.success = false;
        this.onChange.emit(change);
    }

    public processChange(key: string, oldValue: any, newValue: any): void {}
}

export class FieldInputChange {
    public constructor(public key: string, public oldValue: any, public newValue: any) {}
}
