import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, SnackBarService } from 'bioengine.core.api.client';
import { StateService } from './StateService';
import { PageContext } from './PageContext';

export abstract class AbstractPageComponent {
    public snackBarService: SnackBarService;
    protected _stateService: StateService;
    protected _router: Router;
    protected _route: ActivatedRoute;
    protected _dialogService: DialogService;

    protected constructor(context: PageContext) {
        this._stateService = context.stateService;
        this._route = context.route;
        this._router = context.router;
        this.snackBarService = context.snackBarService;
        this._dialogService = context.dialogService;
    }

    protected _setTitle(title: string): void {
        this._stateService.setTitle(title);
    }
}
