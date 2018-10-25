import {StateService} from '../@core/data/state.service';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsService} from './ToastsService';

export abstract class PageComponent {
  public Title = 'Пустой заголовок';
  protected StateService: StateService;
  protected Router: Router;
  protected Route: ActivatedRoute;
  public ToastsService: ToastsService;

  protected constructor(context: PageContext) {
    this.StateService = context.StateService;
    this.Route = context.Route;
    this.Router = context.Router;
    this.ToastsService = context.ToastsService;
    this.StateService.onTitleChange().subscribe(title => {
      this.Title = title;
      document.title = title + ' - BRC Games';
    });
  }
}

@Injectable()
export class PageContext {
  public StateService: StateService;

  public Router: Router;

  public ToastsService: ToastsService;

  public Route: ActivatedRoute;

  constructor(stateService: StateService, router: Router, route: ActivatedRoute, toastsService: ToastsService) {
    this.Route = route;
    this.ToastsService = toastsService;
    this.Router = router;
    this.StateService = stateService;
  }
}