import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { FileBlock } from 'app/@models/blocks/FileBlock';
import { ServicesProvider } from 'app/@services/ServicesProvider';
import { PostsService } from 'app/@services/ContentService';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { ContentBlockFormComponent, BlockFieldDescriptor } from './ContentBlockFormComponent';
import { IKeyedCollection, NumberKeyedCollection } from 'app/@common/KeyedCollection';
import { StorageItem } from 'app/@models/results/StorageItem';
import { DialogService } from 'app/@common/modals/DialogService';
import { StorageManagerDialogComponent } from 'app/@common/storage/StorageManagerDialogComponent';
import { DialogConfig } from 'app/@common/modals/DialogConfig';
import { StorageNode } from 'app/@services/StorageService';

@Component({
    selector: 'file-block-form',
    template: `
        <div [formGroup]="Form.FormGroup">
            <div class="file" *ngIf="File">
                <div class="icon">
                    <icon iconName="fa-file"></icon>
                </div>
                <p>{{ File.FileName }}</p>
                <p>{{ File.FileSize | fileSize }}</p>
                <div (click)="deletePicture(picture)" class="deleteOverlay">
                    <icon iconName="fa-trash"></icon>
                </div>
            </div>
            <div *ngIf="!File">
                <p style="text-align:center">Выберите файл</p>
                <p style="text-align:center">
                    <button mat-raised-button color="accent" (click)="showStorageDialog()">
                        Выбрать
                    </button>
                </p>
            </div>
        </div>
    `,
    styleUrls: [`./fileblock-form.component.scss`]
})
export class FileBlockFormComponent extends ContentBlockFormComponent<FileBlock> {
    public File: StorageItem;

    constructor(
        private servicesProvider: ServicesProvider,
        snackBarService: SnackBarService,
        protected dialogService: DialogService
    ) {
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

    protected afterInit(): void {
        super.afterInit();
        if (!FileBlock.IsEmpty(this.Model)) {
            this.File = this.Model.Data.File;
        }
    }

    public delete(): void {
        this.File = null;
        this.Model.Data.File = null;
    }

    public showStorageDialog(replace = false): void {
        this.dialogService
            .show(StorageManagerDialogComponent, '', (config: DialogConfig) => {
                config.maxWidth = '90vw';
                config.width = '90vw';
            })
            .dialogRef.afterClosed()
            .subscribe((nodes: StorageNode[]) => {
                nodes.forEach(node => {
                    this.File = node.Item;
                });

                const control = this.Form.FormGroup.get(this.getFieldName('File'));
                control.patchValue(this.File);
                console.log(this.Form);
            });
    }
}
