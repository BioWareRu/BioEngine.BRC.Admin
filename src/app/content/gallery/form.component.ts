import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {PageContext} from '../../@common/PageComponent';
import {ContentFormComponent} from '../../@common/forms/FormComponent';
import {Gallery} from '../../@models/Gallery';
import {SaveGalleryResponse} from '../../@models/results/Gallery';
import {ServicesProvider} from '../../@services/ServicesProvider';
import {BaseService} from '../../@common/BaseService';

@Component({
    moduleId: module.id,
    selector: 'galleryForm',
    templateUrl: './form.component.html',
    providers: [
        PageContext
    ]
})
export class GalleryFormComponent extends ContentFormComponent<Gallery, SaveGalleryResponse> implements OnInit {


    constructor(context: PageContext, servicesProvider: ServicesProvider) {
        super(context, servicesProvider);
    }

    protected constructorDataFrom(): void {
        this.registerFormControl('Text', [<any>Validators.required], 'Data.Text');
        this.registerFormControl('Pictures', [<any>Validators.required], 'Data.Pictures');
    }

    protected getNewModelTitle(): string {
        return 'Создание галереи';
    }

    protected getRoute(): string {
        return '/content/list/gallery';
    }

    protected getService(): BaseService<Gallery> {
        return this.servicesProvider.GalleryService;
    }
}
