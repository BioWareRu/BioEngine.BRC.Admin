import { Component, Input } from '@angular/core';
import { AbstractFormComponent } from '@common/forms/abstract-form-component';
import { AbstractModel } from '@models/base/abstract-model';

@Component({
    selector: 'form-layout-content',
    templateUrl: './FormLayoutContentComponent.html',
    styles: [
        `
            button {
                margin-right: 8px;
            }
        `
    ]
})
export class FormLayoutContentComponent<TModel extends AbstractModel> {
    @Input() public formComponent: AbstractFormComponent<TModel>;
}
