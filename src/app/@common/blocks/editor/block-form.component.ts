import { Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild } from '@angular/core';
import { DynamicHostDirective } from '@common/directives/DynamicHostDirective';
import { Form } from '@common/forms/Form';
import { AbstractBaseContentBlock, ContentBlockItemType } from '@models/blocks/abstract-content-block';
import { CutBlock } from '@models/blocks/CutBlock';
import { FileBlock } from '@models/blocks/FileBlock';
import { GalleryBlock } from '@models/blocks/GalleryBlock';
import { TextBlock } from '@models/blocks/TextBlock';
import { TwitterBlock } from '@models/blocks/TwitterBlock';
import { YoutubeBlock } from '@models/blocks/YoutubeBlock';
import Dictionary from '../../Dictionary';
import { BlocksManager } from '../BlocksManager';
import { AbstractContentBlockFormComponent } from './abstract-content-block-form-component';
import { CutBlockFormComponent } from './cutblock-form.component';
import { FileBlockFormComponent } from './fileblock-form.component';
import { GalleryBlockFormComponent } from './galleryblock-form.component';
import { TextBlockFormComponent } from './textblock-form.component';
import { TwitterBlockFormComponent } from './twitterblock-form.component';
import { YoutubeBlockFormComponent } from './youtubeblock-form.component';

@Component({
    selector: 'blockForm',
    template: `
        <ng-container>
            <button class="addBlock top" mat-icon-button [matMenuTriggerFor]="menuTop">
                <icon iconName="fa-plus"></icon>
            </button>
            <mat-menu #menuTop="matMenu">
                <ng-container *ngFor="let config of blocksManager.types.values()">
                    <button mat-menu-item (click)="addBlock(config.type, 'before')">
                        <icon [icon]="config.icon"></icon>
                        <span>{{ config.title }}</span>
                    </button>
                </ng-container
                >
            </mat-menu>
        </ng-container>
        <ng-template dynamicHost></ng-template>
        <ng-container>
            <button class="addBlock bottom" mat-icon-button [matMenuTriggerFor]="menu">
                <icon iconName="fa-plus"></icon>
            </button>
            <mat-menu #menu="matMenu">
                <ng-container *ngFor="let config of blocksManager.types.values()">
                    <button mat-menu-item (click)="addBlock(config.type)">
                        <icon [icon]="config.icon"></icon>
                        <span>{{ config.title }}</span>
                    </button>
                </ng-container
                >
            </mat-menu>
        </ng-container>
    `
})
export class BlockFormComponent<TModel extends AbstractBaseContentBlock> implements OnInit {
    constructor(private readonly _componentFactoryResolver: ComponentFactoryResolver) {
    }

    static forms = new Dictionary<ContentBlockItemType, Type<any>>();

    @ViewChild(DynamicHostDirective) adHost: DynamicHostDirective;

    @Input()
    public blocksManager: BlocksManager;

    @Input() public model: TModel;

    @Input()
    public form: Form;

    ngOnInit(): void {
        if (BlockFormComponent.forms.size() === 0) {
            BlockFormComponent.forms.set(ContentBlockItemType.Text, TextBlockFormComponent);
            BlockFormComponent.forms.set(ContentBlockItemType.Gallery, GalleryBlockFormComponent);
            BlockFormComponent.forms.set(ContentBlockItemType.File, FileBlockFormComponent);
            BlockFormComponent.forms.set(ContentBlockItemType.Cut, CutBlockFormComponent);
            BlockFormComponent.forms.set(ContentBlockItemType.Twitter, TwitterBlockFormComponent);
            BlockFormComponent.forms.set(ContentBlockItemType.Youtube, YoutubeBlockFormComponent);
        }

        const formComponent = BlockFormComponent.forms.get(this.model.type);
        if (!formComponent) {
            throw new Error('Can\'t find form component for ' + this.model.type);
        }
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
            formComponent
        );

        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        const instance = <AbstractContentBlockFormComponent<TModel>>componentRef.instance;
        instance.model = this.model;
        instance.form = this.form;
        instance.blocksManager = this.blocksManager;
    }

    public addBlock(type: ContentBlockItemType, direction = 'after'): void {
        const newBlock = this.blocksManager.createBlock(type);
        if (this._isEmpty()) {
            this.blocksManager.replaceBlock(this.model, newBlock);
        } else {
            this.blocksManager.addBlock(newBlock, this.model, direction);
        }
        this.blocksManager.update();
    }

    private _isEmpty(): boolean {
        let isEmpty = false;
        switch (this.model.type) {
            case ContentBlockItemType.Text:
                isEmpty = TextBlock.isEmpty(<TextBlock>(<unknown>this.model));
                break;
            case ContentBlockItemType.Cut:
                isEmpty = CutBlock.isEmpty(<CutBlock>(<unknown>this.model));
                break;
            case ContentBlockItemType.File:
                isEmpty = FileBlock.isEmpty(<FileBlock>(<unknown>this.model));
                break;
            case ContentBlockItemType.Gallery:
                isEmpty = GalleryBlock.isEmpty(<GalleryBlock>(<unknown>this.model));
                break;
            case ContentBlockItemType.Twitter:
                isEmpty = TwitterBlock.isEmpty(<TwitterBlock>(<unknown>this.model));
                break;
            case ContentBlockItemType.Youtube:
                isEmpty = YoutubeBlock.isEmpty(<YoutubeBlock>(<unknown>this.model));
                break;
        }

        return isEmpty;
    }
}
