import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Validators} from "@angular/forms";
import {map} from "rxjs/operators";
import {Developer} from "../../../@models/Developer";
import {SaveDeveloperResponse} from "../../../@models/results/Developer";
import {ServicesProvider} from "../../../@services/ServicesProvider";
import {SectionFormComponent} from "../../../@common/forms/FormComponent";
import {PageContext} from "../../../@common/PageComponent";

@Component({
  moduleId: module.id,
  selector: 'developerForm',
  templateUrl: './form.component.html',
  providers: [
    PageContext
  ]
})
export class DeveloperFormComponent extends SectionFormComponent<Developer, SaveDeveloperResponse> implements OnInit {
  private DeveloperId: number;
  private isPublished: boolean;

  constructor(context: PageContext, servicesProvider: ServicesProvider) {
    super(context, servicesProvider);
  }

  protected doAdd(): Observable<SaveDeveloperResponse> {
    return this.servicesProvider.DevelopersService.add(this.model);
  }

  protected doUpdate(): Observable<SaveDeveloperResponse> {
    return this.servicesProvider.DevelopersService.update(this.DeveloperId, this.model);
  }

  protected constructForm() {
    this.registerFormControl('Title', [<any>Validators.required]);
    this.registerFormControl('Url', [<any>Validators.required]);
    this.registerFormControl('Description', [<any>Validators.required]);
    this.registerFormControl('ShortDescription', [<any>Validators.required]);
    this.registerFormControl('Keywords', [<any>Validators.required]);
    this.registerFormControl('Hashtag', [<any>Validators.required]);
    this.registerFormControl('Logo', [<any>Validators.required]);
    this.registerFormControl('LogoSmall', [<any>Validators.required]);
    this.registerFormControl('Sites', [<any>Validators.required]);
  }

  ngOnInit(): void {
    const id: Observable<number> = this.Route.params.pipe(map(p => p.id));
    id.subscribe(developerId => {
      if (developerId > 0) {
        this.DeveloperId = developerId;
        this.servicesProvider.DevelopersService.get(developerId).subscribe(developer => {
          this.model = developer;
          this.isPublished = developer.IsPublished;
          this.StateService.setTitle(developer.Title);
          this.loadFormData();
        });
      } else {
        this.isNew = true;
        this.model = new Developer();
        this.StateService.setTitle("Добавление разработчика");
        this.loadFormData();
      }
    });
  }

  protected processSuccessSave(saveResult: SaveDeveloperResponse) {
    if (!this.DeveloperId) {
      this.Router.navigate(['/sections/developers', saveResult.Model.Id, 'edit']);
    }
  }


}
