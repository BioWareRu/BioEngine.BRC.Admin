import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { DialogService } from '@common/modals/DialogService';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { StorageManagerSelectMode } from '@common/storage/StorageManagerSelectMode';
import { StorageManagerDialogComponent } from '@common/storage/StorageManagerDialogComponent';
import { FileBlock } from '@models/blocks/FileBlock';
import { StorageItem } from '@models/results/StorageItem';
import { ServicesProvider } from '@services/ServicesProvider';
import { StorageNode } from '@services/StorageNode';
import { AbstractContentBlockFormComponent } from './abstract-content-block-form-component';
import { BlockFieldDescriptor } from './BlockFieldDescriptor';

@Component({
    selector: 'file-block-form',
    template: `
        <div [formGroup]="form.formGroup">
            <div class="file" *ngIf="file">
                <div class="icon">
                    <icon iconName="fa-file"></icon>
                </div>
                <p>{{ file.fileName }}</p>
                <p>{{ file.fileSize | fileSize }}</p>
                <div (click)="delete()" class="deleteOverlay">
                    <icon iconName="fa-trash"></icon>
                </div>
            </div>
            <div *ngIf="!file">
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
export class FileBlockFormComponent extends AbstractContentBlockFormComponent<FileBlock> {
    public file: StorageItem | null;

    constructor(
        private readonly _servicesProvider: ServicesProvider,
        protected _dialogService: DialogService,
        snackBarService: SnackBarService
    ) {
        super(snackBarService);
    }

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [new BlockFieldDescriptor('file', [Validators.required], 'data.file')];
    }

    public isEmpty(): boolean {
        return !this.model.data.file || this.model.data.file.fileSize === 0;
    }

    protected _afterInit(): void {
        super._afterInit();
        if (!FileBlock.isEmpty(this.model)) {
            this.file = this.model.data.file;
        }
    }

    public delete(): void {
        this.file = null;
        this.model.data.file = null;
    }

    public showStorageDialog(): void {
        this._dialogService
            .show(StorageManagerDialogComponent, StorageManagerSelectMode.Single, (config) => {
                config.maxWidth = '90vw';
                config.width = '90vw';
            })
            .dialogRef.afterClosed()
            .subscribe((nodes: Array<StorageNode>) => {
                nodes.forEach(node => {
                    this.file = node.item;
                });

                const control = this.form.formGroup.get(this.getFieldName('file'));
                if (control) {
                    control.patchValue(this.file);
                    console.log(this.form);
                }
            });
    }
}
