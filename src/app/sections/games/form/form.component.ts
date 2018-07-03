import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Validators} from "@angular/forms";
import {map} from "rxjs/operators";
import {ServicesProvider} from "../../../@services/ServicesProvider";
import {SectionFormComponent} from "../../../@common/forms/FormComponent";
import {PageContext} from "../../../@common/PageComponent";
import {SaveGameResponse} from "../../../@models/results/Game";
import {Game} from "../../../@models/Game";

@Component({
  moduleId: module.id,
  selector: 'gameForm',
  templateUrl: './form.component.html',
  providers: [
    PageContext
  ]
})
export class GameFormComponent extends SectionFormComponent<Game, SaveGameResponse> implements OnInit {
  private gameId: number;
  private isPublished: boolean;

  constructor(context: PageContext, servicesProvider: ServicesProvider) {
    super(context, servicesProvider);
  }

  protected doAdd(): Observable<SaveGameResponse> {
    return this.servicesProvider.GamesService.add(this.model);
  }

  protected doUpdate(): Observable<SaveGameResponse> {
    return this.servicesProvider.GamesService.update(this.gameId, this.model);
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
    id.subscribe(gameId => {
      if (gameId > 0) {
        this.gameId = gameId;
        this.servicesProvider.GamesService.get(gameId).subscribe(game => {
          this.model = game;
          this.isPublished = game.IsPublished;
          this.StateService.setTitle(game.Title);
          this.loadFormData();
        });
      } else {
        this.isNew = true;
        this.model = new Game();
        this.StateService.setTitle("Добавление игры");
        this.loadFormData();
      }
    });
  }

  protected processSuccessSave(saveResult: SaveGameResponse) {
    if (!this.gameId) {
      this.Router.navigate(['/sections/games', saveResult.Model.Id, 'edit']);
    }
  }


}
