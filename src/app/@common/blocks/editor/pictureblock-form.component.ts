import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { DialogService } from '@common/modals/DialogService';
import { SnackBarService } from '@common/snacks/SnackBarService';
import { StorageManagerSelectMode } from '@common/storage/StorageManagerSelectMode';
import { StorageManagerDialogComponent } from '@common/storage/StorageManagerDialogComponent';
import { PictureBlock } from '@models/blocks/PictureBlock';
import { StorageItem } from '@models/results/StorageItem';
import { ServicesProvider } from '@services/ServicesProvider';
import { StorageNode } from '@services/StorageNode';
import { CustomValidators } from 'ngx-custom-validators';
import { AbstractContentBlockFormComponent } from './abstract-content-block-form-component';
import { BlockFieldDescriptor } from './BlockFieldDescriptor';

@Component({
    selector: 'picture-block-form',
    template: `
        <div [formGroup]="form.formGroup">
            <div *ngIf="item">
                <div class="singlePicture">
                    <img [src]="model.data.picture.publicUri" alt="{{model.data.picture.fileName}}}"/>
                    <div class="addOverlay">
                        <icon (click)="showStorageDialog()" iconName="fa-plus"></icon>
                        <icon
                                (click)="deletePicture()"
                                iconName="fa-trash"
                        ></icon>
                    </div>
                </div>
                <text-input
                        [inputFormGroup]="form.formGroup"
                        [inputFieldName]="getFieldName('url')"
                        inputLabel="Ссылка"
                ></text-input>
            </div>
            <div *ngIf="!item">
                <p style="text-align:center">Выберите изображение</p>
                <p style="text-align:center">
                    <button mat-raised-button color="accent" (click)="showStorageDialog()">
                        Выбрать
                    </button>
                </p>
            </div>
        </div>
    `,
    styleUrls: ['./pictureblock-form.component.scss']
})
export class PictureBlockFormComponent extends AbstractContentBlockFormComponent<PictureBlock> {
    constructor(
        private readonly _servicesProvider: ServicesProvider,
        protected _dialogService: DialogService,
        snackBarService: SnackBarService
    ) {
        super(snackBarService);
    }

    public item: StorageItem | null;

    protected _getFields(): Array<BlockFieldDescriptor> {
        return [
            new BlockFieldDescriptor('picture', [Validators.required], 'data.picture'),
            new BlockFieldDescriptor('url', [CustomValidators.url], 'data.url')
        ];
    }

    public isEmpty(): boolean {
        return !this.model.data.picture;
    }

    protected _afterInit(): void {
        super._afterInit();
        this.item = this.model.data.picture;
    }

    public deletePicture(): void {
        this.item = null;
        this.model.data.picture = null;
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
                    this.item = node.item;
                });

                const control = this.form.formGroup.get(this.getFieldName('picture'));
                if (control) {
                    control.patchValue(this.item);
                }
            });
    }
}
