import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { FileBlock } from 'app/@models/posts/FileBlock';
import { ServicesProvider } from 'app/@services/ServicesProvider';
import { PostsService } from 'app/@services/ContentService';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { PostBlockFormComponent, BlockFieldDescriptor } from '../form.component';

@Component({
    selector: 'file-block-form',
    template: `
        <upload-input
            [FormGroup]="FormGroup"
            [FieldName]="getFieldName('File')"
            Label="Файл"
            DisplayMode="files"
            [Service]="getService()"
            [Multiple]="false"
        ></upload-input>
    `
})
export class FileBlockFormComponent extends PostBlockFormComponent<FileBlock> {
    constructor(private servicesProvider: ServicesProvider, snackBarService: SnackBarService) {
        super(snackBarService);
    }

    public getService(): PostsService {
        return this.servicesProvider.PostsService;
    }

    protected getFields(): BlockFieldDescriptor[] {
        return [new BlockFieldDescriptor('File', [Validators.required], 'Data.File')];
    }

    public isEmpty(): boolean {
        return this.Model.Data.File.FileSize === 0;
    }
}
