import { DialogService } from './../../../@common/modals/DialogService';
import { Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { GalleryBlock } from 'app/@models/posts/GalleryBlock';
import { PostsService } from 'app/@services/ContentService';
import { ServicesProvider } from 'app/@services/ServicesProvider';
import { SnackBarService } from 'app/@common/snacks/SnackBarService';
import { PostBlockFormComponent } from '../form.component';
import { StorageManagerDialogComponent } from 'app/@common/storage/StorageManagerDialogComponent';
import { DialogConfig } from 'app/@common/modals/DialogConfig';
import { StorageNode } from 'app/@services/StorageService';
import {
    IKeyedCollection,
    KeyedCollection,
    NumberKeyedCollection
} from 'app/@common/KeyedCollection';
import { StorageItem } from 'app/@models/results/StorageItem';

@Component({
    selector: 'gallery-block-form',
    template: `
        <div *ngIf="Items.Count() > 0">
            <ng-container *ngIf="Items.Count() == 1">
                <div class="singlePicture">
                    <img [src]="Model.Data.Pictures[0].PublicUri" />
                    <div class="addOverlay">
                        <icon (click)="showStorageDialog(true)" iconName="fa-plus"></icon>
                        <icon
                            (click)="deletePicture(Model.Data.Pictures[0])"
                            iconName="fa-trash"
                        ></icon>
                    </div>
                </div>
            </ng-container>
            <ng-container *ngIf="Items.Count() > 1">
                <div class="picturesList">
                    <ng-container *ngFor="let picture of Items.Values()">
                        <div class="pic">
                            <img src="{{ picture.PublicUri }}" alt="{{ picture.FileName }}" />
                            <div (click)="deletePicture(picture)" class="deleteOverlay">
                                <icon iconName="fa-trash"></icon>
                            </div>
                        </div>
                    </ng-container>
                    <div class="addButton">
                        <icon (click)="showStorageDialog(false)" iconName="fa-plus"></icon>
                    </div>
                </div>
            </ng-container>
        </div>
        <div *ngIf="Items.Count() == 0">
            <p style="text-align:center">Выберите одно или несколько изображений</p>
            <p style="text-align:center">
                <button mat-raised-button color="accent" (click)="showStorageDialog()">
                    Выбрать
                </button>
            </p>
        </div>
    `,
    styleUrls: ['./galleryblock-form.component.scss']
})
export class GalleryBlockFormComponent extends PostBlockFormComponent<GalleryBlock> {
    constructor(
        snackBarService: SnackBarService,
        private servicesProvider: ServicesProvider,
        protected dialogService: DialogService
    ) {
        super(snackBarService);
    }

    public readonly Items: IKeyedCollection<StorageItem, number> = new NumberKeyedCollection<
        StorageItem
    >();

    protected constructForm(): void {
        // this.registerFormControl(
        //     this.getFieldName('Pictures'),
        //     [<any>Validators.required],
        //     'Data.Pictures'
        // );
    }

    protected afterInit(): void {
        super.afterInit();
        this.Model.Data.Pictures.forEach(item => {
            this.Items.Add(item.Id, item);
        });
    }

    public getService(): PostsService {
        return this.servicesProvider.PostsService;
    }

    public deletePicture(pic: StorageItem): void {
        this.Items.Remove(pic.Id);
        this.Model.Data.Pictures = this.Items.Values();
    }

    public showStorageDialog(replace = false): void {
        this.dialogService
            .show(StorageManagerDialogComponent, '', (config: DialogConfig) => {
                config.maxWidth = '90vw';
                config.width = '90vw';
            })
            .dialogRef.afterClosed()
            .subscribe((nodes: StorageNode[]) => {
                if (replace) {
                    this.Items.Clear();
                }
                nodes.forEach(node => {
                    this.Items.Add(node.Item.Id, node.Item);
                });

                this.Model.Data.Pictures = this.Items.Values();

                // this.items = this.items.concat(items);
                // this.Control.patchValue(this.items);
            });
    }
}
