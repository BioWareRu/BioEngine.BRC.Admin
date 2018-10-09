import {Component, Input} from '@angular/core';
import {BioFormControl} from './BioFormControl';

@Component({
  selector: 'errorsList',
  template: `
    <div [hidden]="Control&&Control.valid && !Control.ServerErrors">
      <div *ngIf="Control&&Control.errors">
        <div *ngIf="Control.errors['required']" class="form-text control-error">
          Поле обязательно для заполнения
        </div>
        <div *ngIf="Control.errors['url']" class="form-text control-error">
          Значение должно являться корректным URL
        </div>
      </div>
      <div *ngIf="Control">
        <div *ngFor="let e of Control.ServerErrors" class="form-text control-error">
          {{e}}
        </div>
      </div>
    </div>
  `
})
export class ErrorsListComponent {
  @Input() public Control: BioFormControl;
}
