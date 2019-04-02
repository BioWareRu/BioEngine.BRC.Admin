import { Component, Input } from '@angular/core';
import { AbstractFormInput } from './abstract-form-input';

@Component({
    selector: 'text-input',
    templateUrl: './TextInputComponent.html'
})
export class TextInputComponent extends AbstractFormInput {
    @Input() public type = 'text';
}
