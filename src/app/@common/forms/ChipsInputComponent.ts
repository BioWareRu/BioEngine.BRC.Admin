import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {FormInput} from './FormInput';

@Component({
  selector: 'chips-input',
  templateUrl: './ChipsInputComponent.html'
})
export class ChipsInputComponent extends FormInput {
  @Input() public Options: any;

  public constructor(cd: ChangeDetectorRef) {
    super(cd);
  }
}
