import { Component, Input } from '@angular/core';
import { AbstractBaseService, AbstractEntity, AbstractFormComponent } from 'bioengine.core.api.client';

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
export class FormLayoutComponent<TModel extends AbstractEntity, TService extends AbstractBaseService<TModel>> {
    @Input() public formComponent: AbstractFormComponent<TModel, TService>;
    public objectKeys = Object.keys;

    public save(): void {
        this.formComponent.save();
    }
}
