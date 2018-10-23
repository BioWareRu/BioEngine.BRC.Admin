import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {FormInput} from './FormInput';

@Component({
  selector: 'text-input',
  templateUrl: './TextInputComponent.html'
})
export class TextInputComponent extends FormInput {
  @Input() public Type = 'text';

  public constructor(cd: ChangeDetectorRef) {
    super(cd);
  }
}
