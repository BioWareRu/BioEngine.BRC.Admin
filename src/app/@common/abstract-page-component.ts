import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from './modals/DialogService';
import { SnackBarService } from './snacks/SnackBarService';
import { StateService } from './StateService';

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

@Injectable()
export class PageContext {
    public stateService: StateService;

    public router: Router;

    public snackBarService: SnackBarService;

    public route: ActivatedRoute;
    public dialogService: DialogService;

    constructor(
        stateService: StateService,
        router: Router,
        route: ActivatedRoute,
        snackBarService: SnackBarService,
        dialogService: DialogService
    ) {
        this.route = route;
        this.snackBarService = snackBarService;
        this.router = router;
        this.stateService = stateService;
        this.dialogService = dialogService;
    }
}
