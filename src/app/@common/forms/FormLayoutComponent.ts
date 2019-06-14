import { Component, Input } from '@angular/core';
import { AbstractModel } from '@models/base/abstract-model';
import { AbstractFormComponent } from './abstract-form-component';

@Component({
    selector: 'form-layout',
    templateUrl: './FormLayoutComponent.html',
    styles: [
        `
            button {
                margin-right: 8px;
            }
        `
    ]
})
export class FormLayoutComponent<TModel extends AbstractModel> {
    @Input() public formComponent: AbstractFormComponent<TModel>;
    public objectKeys = Object.keys;

    public save(): void {
        this.formComponent.save();
    }
}
