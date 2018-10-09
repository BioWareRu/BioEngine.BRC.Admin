import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {ServicesProvider} from '../../../@services/ServicesProvider';
import {ContentFormComponent} from '../../../@common/forms/FormComponent';
import {SavePostResponse} from '../../../@models/results/Post';
import {Post} from '../../../@models/Post';
import {PageContext} from '../../../@common/PageComponent';
import {BaseService} from '../../../@common/BaseService';

@Component({
  moduleId: module.id,
  selector: 'postForm',
  templateUrl: './form.component.html',
  providers: [
    PageContext
  ]
})
export class PostFormComponent extends ContentFormComponent<Post, SavePostResponse> implements OnInit {
  constructor(context: PageContext, protected servicesProvider: ServicesProvider) {
    super(context, servicesProvider);
  }

  protected constructorDataFrom() {
    this.registerFormControl('Text', [<any>Validators.required], 'Data.Text');
  }

  protected getNewModelTitle(): string {
    return 'Создание поста';
  }

  protected getRoute(): string {
    return '/contents/posts';
  }

  protected getService(): BaseService<Post> {
    return this.servicesProvider.PostsService;
  }
}
