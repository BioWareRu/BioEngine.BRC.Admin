import {FormControl} from '@angular/forms';
import {AsyncValidatorFn, ValidatorFn} from '@angular/forms/src/directives/validators';
import {AbstractControlOptions} from '@angular/forms/src/model';
import {BaseFormComponent} from './FormComponent';
import 'object-path';

export class BioFormControl extends FormControl {
  public ServerErrors: string[] = [];

  constructor(private _form: BaseFormComponent, private _name: string,
              private _model: any, private _property: string,
              validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
              asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super('', validatorOrOpts, asyncValidator);
    this.setValue(objectPath.get(this._model, this._property));
    this.valueChanges.subscribe(value => this.setModelValue(value));
  }

  public setModelValue(value: any): void {
    const oldValue = objectPath.get(this._model, this._property);
    if (value !== oldValue) {
      objectPath.set(this._model, this._property, value);
      this.ServerErrors = [];
      this._form.registerChange(this._name, oldValue, value);
    }
  }

  reloadValue(): void {
    this.setValue(objectPath.get(this._model, this._property));
  }
}
