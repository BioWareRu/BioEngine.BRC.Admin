import { GalleryBlockFormComponent } from './blocks/galleryblock-form.component';
import { DynamicHostDirective } from 'app/@common/directives/DynamicHostDirective';
import { ViewChild, Component, Input, OnInit, ComponentFactoryResolver, Type } from '@angular/core';
import { PostFormComponent, PostBlockFormComponent } from './form.component';
import { FormGroup } from '@angular/forms';
import { BasePostBlock, ContentBlockItemType } from 'app/@models/Post';
import { IKeyedCollection, KeyedCollection } from 'app/@common/KeyedCollection';
import { TextBlockFormComponent } from './blocks/textblock-form.component';
import { FileBlockFormComponent } from './blocks/fileblock-form.component';

@Component({
    selector: 'blockForm',
    template: `
        <ng-template dynamicHost></ng-template>
    `
})
export class BlockFormComponent<TModel extends BasePostBlock> implements OnInit {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
    static forms: IKeyedCollection<Type<any>> = new KeyedCollection<Type<any>>();

    @ViewChild(DynamicHostDirective) adHost: DynamicHostDirective;

    @Input()
    public postFormComponent: PostFormComponent;

    @Input() public Model: TModel;

    @Input()
    public FormGroup: FormGroup;
    ngOnInit(): void {
        if (BlockFormComponent.forms.Count() === 0) {
            BlockFormComponent.forms.Add(ContentBlockItemType.Text, TextBlockFormComponent);
            BlockFormComponent.forms.Add(ContentBlockItemType.Gallery, GalleryBlockFormComponent);
            BlockFormComponent.forms.Add(ContentBlockItemType.File, FileBlockFormComponent);
        }

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
            BlockFormComponent.forms.Item(this.Model.Type)
        );

        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        const instance = <PostBlockFormComponent<TModel>>componentRef.instance;
        instance.Model = this.Model;
        instance.FormGroup = this.FormGroup;
        instance.postFormComponent = this.postFormComponent;
    }
}
