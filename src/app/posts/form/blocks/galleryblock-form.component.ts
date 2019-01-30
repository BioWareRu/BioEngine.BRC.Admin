import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { GalleryBlock } from 'app/@models/GalleryBlock';
import { PostsService } from 'app/@services/ContentService';
import { ServicesProvider } from 'app/@services/ServicesProvider';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { PostBlockFormComponent } from '../form.component';

@Component({
    selector: 'gallery-block-form',
    template: `
        <upload-input
            [FormGroup]="FormGroup"
            [FieldName]="getFieldName('Pictures')"
            Label="Картинки"
            [Multiple]="true"
            [Service]="getService()"
            [Types]="['image/png', 'image/jpeg', 'image/jpg', 'image/gif']"
        ></upload-input>
    `
})
export class GalleryBlockFormComponent extends PostBlockFormComponent<GalleryBlock> {
    constructor(snackBarService: SnackBarService, private servicesProvider: ServicesProvider) {
        super(snackBarService);
    }

    protected constructForm(): void {
        this.registerFormControl(
            this.getFieldName('Pictures'),
            [<any>Validators.required],
            'Data.Pictures'
        );
    }

    public getService(): PostsService {
        return this.servicesProvider.PostsService;
    }
}
