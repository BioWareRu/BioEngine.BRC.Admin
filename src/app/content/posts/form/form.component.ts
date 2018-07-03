import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Validators} from "@angular/forms";
import {map} from "rxjs/operators";
import {ServicesProvider} from "../../../@services/ServicesProvider";
import {ContentFormComponent} from "../../../@common/forms/FormComponent";
import {SavePostResponse} from "../../../@models/results/Post";
import {Post} from "../../../@models/Post";
import {Utils} from "../../../@common/Utils";
import {PageContext} from "../../../@common/PageComponent";

@Component({
  moduleId: module.id,
  selector: 'postForm',
  templateUrl: './form.component.html',
  providers: [
    PageContext
  ]
})
export class PostFormComponent extends ContentFormComponent<Post, SavePostResponse> implements OnInit {
  private postId: number;
  private isPublished: boolean;

  constructor(context: PageContext, protected servicesProvider: ServicesProvider) {
    super(context, servicesProvider);
  }

  protected doAdd(): Observable<SavePostResponse> {
    return this.servicesProvider.PostsService.add(this.model);
  }

  protected doUpdate(): Observable<SavePostResponse> {
    return this.servicesProvider.PostsService.update(this.postId, this.model);
  }

  protected constructForm() {
    this.registerFormControl('Title', [<any>Validators.required]);
    this.registerFormControl('Url', [<any>Validators.required]);
    this.registerFormControl('Description', [<any>Validators.required]);
    this.registerFormControl('Sections', [<any>Validators.required]);
    this.registerFormControl('Tags', [<any>Validators.required]);
    this.registerFormControl('Text', [<any>Validators.required], 'Data.Text');
  }

  ngOnInit(): void {
    const id: Observable<number> = this.Route.params.pipe(map(p => p.id));
    id.subscribe(postId => {
      if (postId > 0) {
        this.postId = postId;
        this.servicesProvider.PostsService.get(postId).subscribe(post => {
          this.model = post;
          this.isPublished = post.IsPublished;
          this.StateService.setTitle(post.Title);
          this.loadFormData();
        });
      } else {
        this.StateService.setTitle("Добавить пост");
        this.isNew = true;
        this.model = new Post();
        this.loadFormData();
      }
    });
  }

  protected processSuccessSave(saveResult: SavePostResponse) {
    if (!this.postId) {
      this.Router.navigate(['/content/posts', saveResult.Model.Id, 'edit']);
    }
  }

  public processChange(key: string, oldValue: any, newValue: any) {
    return super.processChange(key, oldValue, newValue);
  }
}
