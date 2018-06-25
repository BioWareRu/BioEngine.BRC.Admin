import {FormComponent} from "../../@common/forms/FormComponent";
import {Site} from "../../@models/Site";
import {SaveSiteResponse} from "../../@models/results/Site";
import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AbstractControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ServicesProvider} from "../../@services/ServicesProvider";
import {BioFormControl} from "../../@common/forms/BioFormControl";
import {map} from "rxjs/operators";
import {CustomValidators} from "ng4-validators";

@Component({
  moduleId: module.id,
  selector: 'siteForm',
  templateUrl: './site-form.component.html'
})
export class SitesFormComponent extends FormComponent<Site, SaveSiteResponse> implements OnInit {
  private siteId: number;
  private isPublished: boolean;

  constructor(public route: ActivatedRoute, protected repository: ServicesProvider, private router: Router) {
    super();
  }

  protected doAdd(): Observable<SaveSiteResponse> {
    return this.repository.SitesService.add(this.model);
  }

  protected doUpdate(): Observable<SaveSiteResponse> {
    return this.repository.SitesService.update(this.siteId, this.model);
  }

  protected getFormGroupConfig(): { [p: string]: AbstractControl } {
    return {
      Title: new BioFormControl('', [<any>Validators.required]),
      Url: new BioFormControl('', [<any>Validators.required, CustomValidators.url]),
      Description : new BioFormControl('', [<any>Validators.required]),
      Keywords: new BioFormControl('', [<any>Validators.required]),
    };
  }

  ngOnInit(): void {
    const id: Observable<number> = this.route.params.pipe(map(p => p.id));
    id.subscribe(siteId => {
      if (siteId > 0) {
        this.siteId = siteId;
        this.repository.SitesService.get(siteId).subscribe(site => {
          this.model = <Site>site;
          this.isPublished = site.IsPublished;
          this.initForm();
        });
      } else {
        this.isNew = true;
        this.model = new Site();
        this.initForm();
      }
    });
  }

  protected processChanges(changes) {
  }

  protected processSuccessSave(saveResult: SaveSiteResponse) {
    if (!this.siteId) {
      this.router.navigate(['/sites', saveResult.Model.Id, 'edit']);
    }
  }

}
