import { Component, Input } from '@angular/core';
import { AbstractContentEntityService } from '@common/AbstractContentEntityService';
import { AbstractContentFormComponent } from '@common/forms/AbstractContentFormComponent';
import { FormLayoutComponent } from '@common/forms/FormLayoutComponent';
import { AbstractContentItem } from '@models/base/AbstractContentItem';
import { AbstractSection } from '@models/base/AbstractSection';

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
