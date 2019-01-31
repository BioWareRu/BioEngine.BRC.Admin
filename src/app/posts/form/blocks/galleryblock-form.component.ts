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
        <ng-container *ngFor="let picture of Model.Data.Pictures; index as index">
            <div *ngIf="picture.PublicUri" class="uploadedImage">
                <a class="img" href="{{ picture.PublicUri }}" target="_blank">
                    <img
                        style="max-width:100px"
                        src="{{ picture.PublicUri }}"
                        alt="{{ picture.FileName }}"
                    />
                </a>
            </div>
        </ng-container>
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
