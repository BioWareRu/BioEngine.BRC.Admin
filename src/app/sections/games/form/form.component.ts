import {Component, OnInit} from '@angular/core';
import {ServicesProvider} from '../../../@services/ServicesProvider';
import {SectionFormComponent} from '../../../@common/forms/FormComponent';
import {PageContext} from '../../../@common/PageComponent';
import {SaveGameResponse} from '../../../@models/results/Game';
import {Game} from '../../../@models/Game';
import {BaseService} from '../../../@common/BaseService';

@Component({
  moduleId: module.id,
  selector: 'gameForm',
  templateUrl: './form.component.html',
  providers: [
    PageContext
  ]
})
export class GameFormComponent extends SectionFormComponent<Game, SaveGameResponse> implements OnInit {

  constructor(context: PageContext, servicesProvider: ServicesProvider) {
    super(context, servicesProvider);
  }

  protected getNewModelTitle(): string {
    return 'Создание игры';
  }

  protected getRoute(): string {
    return '/sections/games';
  }

  protected getService(): BaseService<Game> {
    return this.servicesProvider.GamesService;
  }


}
