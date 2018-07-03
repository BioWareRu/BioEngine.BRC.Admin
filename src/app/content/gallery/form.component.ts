import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Validators} from "@angular/forms";
import {map} from "rxjs/operators";
import {PageContext} from "../../@common/PageComponent";
import {ContentFormComponent} from "../../@common/forms/FormComponent";
import {Gallery} from "../../@models/Gallery";
import {SaveGalleryResponse} from "../../@models/results/Gallery";
import {ServicesProvider} from "../../@services/ServicesProvider";

@Component({
  moduleId: module.id,
  selector: 'galleryForm',
  templateUrl: './form.component.html',
  providers: [
    PageContext
  ]
})
export class GalleryFormComponent extends ContentFormComponent<Gallery, SaveGalleryResponse> implements OnInit {
  private postId: number;
  private isPublished: boolean;

  constructor(context: PageContext, protected servicesProvider: ServicesProvider) {
    super(context, servicesProvider);
  }

  protected doAdd(): Observable<SaveGalleryResponse> {
    return this.servicesProvider.GalleryService.add(this.model);
  }

  protected doUpdate(): Observable<SaveGalleryResponse> {
    return this.servicesProvider.GalleryService.update(this.postId, this.model);
  }

  protected constructForm() {
    this.registerFormControl('Title', [<any>Validators.required]);
    this.registerFormControl('Url', [<any>Validators.required]);
    this.registerFormControl('Description', [<any>Validators.required]);
    this.registerFormControl('Sections', [<any>Validators.required]);
    this.registerFormControl('Tags', [<any>Validators.required]);
    this.registerFormControl('Text', [<any>Validators.required], 'Data.Text');
    this.registerFormControl('Pictures', [<any>Validators.required], 'Data.Pictures');
  }

  ngOnInit(): void {
    const id: Observable<number> = this.Route.params.pipe(map(p => p.id));
    id.subscribe(galleryId => {
      if (galleryId > 0) {
        this.postId = galleryId;
        this.servicesProvider.GalleryService.get(galleryId).subscribe(gallery => {
          this.model = gallery;
          this.isPublished = gallery.IsPublished;
          this.StateService.setTitle(gallery.Title);
          this.loadFormData();
        });
      } else {
        this.StateService.setTitle("Добавить галерею");
        this.isNew = true;
        this.model = new Gallery();
        this.loadFormData();
      }
    });
  }

  protected processSuccessSave(saveResult: SaveGalleryResponse) {
    if (!this.postId) {
      this.Router.navigate(['/content/gallery', saveResult.Model.Id, 'edit']);
    }
  }
}
