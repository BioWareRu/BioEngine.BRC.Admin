import { SimpleFormComponent } from 'app/@common/forms/FormComponent';
import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { GalleryBlock } from 'app/@models/GalleryBlock';
import { PostsService } from 'app/@services/ContentService';
import { ServicesProvider } from 'app/@services/ServicesProvider';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';

@Component({
    selector: 'gallery-block-form',
    template: `
        <upload-input
            [FormGroup]="formGroup"
            FieldName="Pictures"
            Label="Картинки"
            [Multiple]="true"
            [Service]="getService()"
            [Types]="['image/png', 'image/jpeg', 'image/jpg', 'image/gif']"
        ></upload-input>
    `
})
export class GalleryBlockFormComponent extends SimpleFormComponent<
    GalleryBlock
> {
    constructor(
        snackBarService: SnackBarService,
        private servicesProvider: ServicesProvider
    ) {
        super(snackBarService);
    }

    protected constructForm(): void {
        this.registerFormControl(
            'Pictures',
            [<any>Validators.required],
            'Data.Pictures'
        );
    }

    public getService(): PostsService {
        return this.servicesProvider.PostsService;
    }
}
