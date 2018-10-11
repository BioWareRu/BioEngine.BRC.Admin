import {FormInput} from './FormInput';
import {ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'checkbox-input',
  templateUrl: './CheckboxInputComponent.html'
})
export class CheckboxInputComponent extends FormInput {
  public constructor(cd: ChangeDetectorRef) {
    super(cd);
  }
}
