import {FormComponent} from "../../@common/forms/FormComponent";
import {Site} from "../../@models/Site";
import {SaveSiteResponse} from "../../@models/results/Site";
import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Validators} from "@angular/forms";
import {ServicesProvider} from "../../@services/ServicesProvider";
import {map} from "rxjs/operators";
import {CustomValidators} from "ng4-validators";
import {PageContext} from "../../@common/PageComponent";

@Component({
  moduleId: module.id,
  selector: 'siteForm',
  templateUrl: './site-form.component.html',
  providers: [
    PageContext
  ]
})
export class SitesFormComponent extends FormComponent<Site, SaveSiteResponse> implements OnInit {
  private siteId: number;
  private isPublished: boolean;

  constructor(context: PageContext, private servicesProvider: ServicesProvider) {
    super(context);
  }

  protected doAdd(): Observable<SaveSiteResponse> {
    return this.servicesProvider.SitesService.add(this.model);
  }

  protected doUpdate(): Observable<SaveSiteResponse> {
    return this.servicesProvider.SitesService.update(this.siteId, this.model);
  }

  protected constructForm() {
    this.registerFormControl('Title', [<any>Validators.required]);
    this.registerFormControl('Url', [<any>Validators.required, CustomValidators.url]);
    this.registerFormControl('Description', [<any>Validators.required]);
    this.registerFormControl('Keywords', [<any>Validators.required]);
  }

  ngOnInit(): void {
    const id: Observable<number> = this.Route.params.pipe(map(p => p.id));
    id.subscribe(siteId => {
      if (siteId > 0) {
        this.siteId = siteId;
        this.servicesProvider.SitesService.get(siteId).subscribe(site => {
          this.model = site;
          this.isPublished = site.IsPublished;
          this.StateService.setTitle(site.Title);
          this.initForm();
        });
      } else {
        this.isNew = true;
        this.model = new Site();
        this.StateService.setTitle("Добавление сайта");
        this.initForm();
      }
    });
  }

  protected processSuccessSave(saveResult: SaveSiteResponse) {
    if (!this.siteId) {
      this.Router.navigate(['/sites', saveResult.Model.Id, 'edit']);
    }
  }


}
