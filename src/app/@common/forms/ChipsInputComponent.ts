import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {FormInput} from './FormInput';

@Component({
  selector: 'chips-input',
  templateUrl: './ChipsInputComponent.html'
})
export class ChipsInputComponent extends FormInput {
  @Input() public Options: any;
  @Input() public OnlyFromAutocomplete: boolean = true;
  @Input() public Placeholder: string = 'Добавить';
  @Input() public Placeholder2: string = 'Выбери меня';

  public constructor(cd: ChangeDetectorRef) {
    super(cd);
  }
}
