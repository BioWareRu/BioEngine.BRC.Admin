import { SimpleFormComponent } from 'app/@common/forms/FormComponent';
import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { FileBlock } from 'app/@models/FileBlock';
import { ServicesProvider } from 'app/@services/ServicesProvider';
import { PostsService } from 'app/@services/ContentService';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';

@Component({
    selector: 'file-block-form',
    template: `
        <upload-input
            [FormGroup]="formGroup"
            FieldName="File"
            Label="Файл"
            DisplayMode="files"
            [Service]="getService()"
            [Multiple]="false"
        ></upload-input>
    `
})
export class FileBlockFormComponent extends SimpleFormComponent<FileBlock> {
    constructor(
        private servicesProvider: ServicesProvider,
        snackBarService: SnackBarService
    ) {
        super(snackBarService);
    }

    protected constructForm(): void {
        this.registerFormControl(
            'File',
            [<any>Validators.required],
            'Data.File'
        );
    }

    public getService(): PostsService {
        return this.servicesProvider.PostsService;
    }
}
