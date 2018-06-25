import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AbstractControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {Developer} from "../../../@models/Developer";
import {SaveDeveloperResponse} from "../../../@models/results/Developer";
import {ServicesProvider} from "../../../@services/ServicesProvider";
import {SectionFormComponent} from "../../../@common/forms/FormComponent";
import {BioFormControl} from "../../../@common/forms/BioFormControl";

@Component({
  moduleId: module.id,
  selector: 'developerForm',
  templateUrl: './form.component.html'
})
export class DeveloperFormComponent extends SectionFormComponent<Developer, SaveDeveloperResponse> implements OnInit {
  private DeveloperId: number;
  private isPublished: boolean;

  constructor(public route: ActivatedRoute, protected servicesProvider: ServicesProvider, private router: Router) {
    super(servicesProvider);
  }

  protected doAdd(): Observable<SaveDeveloperResponse> {
    return this.servicesProvider.DevelopersService.add(this.model);
  }

  protected doUpdate(): Observable<SaveDeveloperResponse> {
    return this.servicesProvider.DevelopersService.update(this.DeveloperId, this.model);
  }

  protected getFormGroupConfig(): { [p: string]: AbstractControl } {
    return {
      Title: new BioFormControl('', [<any>Validators.required]),
      Url: new BioFormControl('', [<any>Validators.required]),
      Description: new BioFormControl('', [<any>Validators.required]),
      ShortDescription: new BioFormControl('', [<any>Validators.required]),
      Keywords: new BioFormControl('', [<any>Validators.required]),
      Hashtag: new BioFormControl('', [<any>Validators.required]),
      Logo: new BioFormControl('', [<any>Validators.required]),
      LogoSmall: new BioFormControl('', [<any>Validators.required]),
      Sites: new BioFormControl('', [<any>Validators.required])
    };
  }

  ngOnInit(): void {
    const id: Observable<number> = this.route.params.pipe(map(p => p.id));
    id.subscribe(DeveloperId => {
      if (DeveloperId > 0) {
        this.DeveloperId = DeveloperId;
        this.servicesProvider.DevelopersService.get(DeveloperId).subscribe(Developer => {
          this.model = <Developer>Developer;
          this.isPublished = Developer.IsPublished;
          this.loadFormData();
        });
      } else {
        this.isNew = true;
        this.model = new Developer();
        console.log(this.model);
        this.loadFormData();
      }
    });
  }

  protected processChanges(changes) {
  }

  protected processSuccessSave(saveResult: SaveDeveloperResponse) {
    if (!this.DeveloperId) {
      this.router.navigate(['/Developers', saveResult.Model.Id, 'edit']);
    }
  }

}
