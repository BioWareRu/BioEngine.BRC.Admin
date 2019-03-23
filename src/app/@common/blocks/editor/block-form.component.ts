import { YoutubeBlock } from './../../../@models/blocks/YoutubeBlock';
import { GalleryBlock } from 'app/@models/blocks/GalleryBlock';
import { FileBlock } from 'app/@models/blocks/FileBlock';
import { TextBlock } from 'app/@models/blocks/TextBlock';
import { BlocksManager } from '../BlocksManager';
import { DynamicHostDirective } from 'app/@common/directives/DynamicHostDirective';
import { ViewChild, Component, Input, OnInit, ComponentFactoryResolver, Type } from '@angular/core';
import { IKeyedCollection, KeyedCollection } from 'app/@common/KeyedCollection';
import { Form } from 'app/@common/forms/Form';
import { BaseContentBlock, ContentBlockItemType } from 'app/@models/blocks/ContentBlock';
import { TextBlockFormComponent } from './textblock-form.component';
import { GalleryBlockFormComponent } from './galleryblock-form.component';
import { TwitterBlockFormComponent } from './twitterblock-form.component';
import { YoutubeBlockFormComponent } from './youtubeblock-form.component';
import { ContentBlockFormComponent } from './ContentBlockFormComponent';
import { FileBlockFormComponent } from './fileblock-form.component';
import { CutBlockFormComponent } from './cutblock-form.component';
import { CutBlock } from 'app/@models/blocks/CutBlock';
import { TwitterBlock } from 'app/@models/blocks/TwitterBlock';

@Component({
    selector: 'blockForm',
    template: `
        <ng-container>
            <button class="addBlock top" mat-icon-button [matMenuTriggerFor]="menuTop">
                <icon iconName="fa-plus"></icon>
            </button>
            <mat-menu #menuTop="matMenu">
                <ng-container *ngFor="let config of blocksManager.Types.Values()">
                    <button mat-menu-item (click)="addBlock(config.type, 'before')">
                        <icon [icon]="config.icon"></icon>
                        <span>{{ config.title }}</span>
                    </button></ng-container
                >
            </mat-menu>
        </ng-container>
        <ng-template dynamicHost></ng-template>
        <ng-container>
            <button class="addBlock bottom" mat-icon-button [matMenuTriggerFor]="menu">
                <icon iconName="fa-plus"></icon>
            </button>
            <mat-menu #menu="matMenu">
                <ng-container *ngFor="let config of blocksManager.Types.Values()">
                    <button mat-menu-item (click)="addBlock(config.type)">
                        <icon [icon]="config.icon"></icon>
                        <span>{{ config.title }}</span>
                    </button></ng-container
                >
            </mat-menu>
        </ng-container>
    `
})
export class BlockFormComponent<TModel extends BaseContentBlock> implements OnInit {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
    static forms: IKeyedCollection<Type<any>, string> = new KeyedCollection<Type<any>>();

    @ViewChild(DynamicHostDirective) adHost: DynamicHostDirective;

    @Input()
    public blocksManager: BlocksManager;

    @Input() public Model: TModel;

    @Input()
    public Form: Form;
    ngOnInit(): void {
        if (BlockFormComponent.forms.Count() === 0) {
            BlockFormComponent.forms.Add(ContentBlockItemType.Text, TextBlockFormComponent);
            BlockFormComponent.forms.Add(ContentBlockItemType.Gallery, GalleryBlockFormComponent);
            BlockFormComponent.forms.Add(ContentBlockItemType.File, FileBlockFormComponent);
            BlockFormComponent.forms.Add(ContentBlockItemType.Cut, CutBlockFormComponent);
            BlockFormComponent.forms.Add(ContentBlockItemType.Twitter, TwitterBlockFormComponent);
            BlockFormComponent.forms.Add(ContentBlockItemType.Youtube, YoutubeBlockFormComponent);
        }

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
            BlockFormComponent.forms.Item(this.Model.Type)
        );

        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        const instance = <ContentBlockFormComponent<TModel>>componentRef.instance;
        instance.Model = this.Model;
        instance.Form = this.Form;
        instance.blocksManager = this.blocksManager;
    }

    public addBlock(type: ContentBlockItemType, direction = 'after'): void {
        const newBlock = this.blocksManager.CreateBlock(type);
        if (this.isEmpty()) {
            this.blocksManager.ReplaceBlock(this.Model, newBlock);
        } else {
            this.blocksManager.AddBlock(newBlock, this.Model, direction);
        }
        this.blocksManager.Update();
    }

    private isEmpty(): boolean {
        let isEmpty = false;
        switch (this.Model.Type) {
            case ContentBlockItemType.Text:
                isEmpty = TextBlock.IsEmpty((<unknown>this.Model) as TextBlock);
                break;
            case ContentBlockItemType.Cut:
                isEmpty = CutBlock.IsEmpty((<unknown>this.Model) as CutBlock);
                break;
            case ContentBlockItemType.File:
                isEmpty = FileBlock.IsEmpty((<unknown>this.Model) as FileBlock);
                break;
            case ContentBlockItemType.Gallery:
                isEmpty = GalleryBlock.IsEmpty((<unknown>this.Model) as GalleryBlock);
                break;
            case ContentBlockItemType.Twitter:
                isEmpty = TwitterBlock.IsEmpty((<unknown>this.Model) as TwitterBlock);
                break;
            case ContentBlockItemType.Youtube:
                isEmpty = YoutubeBlock.IsEmpty((<unknown>this.Model) as YoutubeBlock);
                break;
        }
        return isEmpty;
    }
}
