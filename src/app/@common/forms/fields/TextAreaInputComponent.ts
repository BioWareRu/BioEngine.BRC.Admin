import {Component, Input} from '@angular/core';
import {FormInput} from './FormInput';

@Component({
    selector: 'textarea-input',
    templateUrl: './TextAreaInputComponent.html',
})
export class TextAreaInputComponent extends FormInput {
    @Input() public AutoResize = true;
    @Input() public Rows = 6;
}
