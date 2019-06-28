import { Component, Input } from '@angular/core';
import { FormLayoutComponent } from '@common/forms/FormLayoutComponent';
import { AbstractContentEntityService, AbstractContentFormComponent, AbstractContentItem, AbstractSection } from 'bioengine.core.api.client';

@Component({
    selector: 'content-form-layout',
    templateUrl: './ContentFormLayoutComponent.html',
    styles: [
            `
            button {
                margin-right: 8px;
            }
        `
    ]
})
export class ContentFormLayoutComponent<TModel extends AbstractSection | AbstractContentItem,
    TService extends AbstractContentEntityService<TModel>> extends FormLayoutComponent<TModel, TService> {
    @Input() public formComponent: AbstractContentFormComponent<TModel, TService>;
}
