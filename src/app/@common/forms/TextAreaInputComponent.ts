import {ChangeDetectorRef, Component} from '@angular/core';
import {FormInput} from './FormInput';

@Component({
  selector: 'textarea-input',
  templateUrl: './TextAreaInputComponent.html',
})
export class TextAreaInputComponent extends FormInput {
  public constructor(cd: ChangeDetectorRef) {
    super(cd);
  }
}
