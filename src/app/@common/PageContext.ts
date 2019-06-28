import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, SnackBarService } from 'bioengine.core.api.client';
import { StateService } from './StateService';

@Injectable()
export class PageContext {
    public stateService: StateService;
    public router: Router;
    public snackBarService: SnackBarService;
    public route: ActivatedRoute;
    public dialogService: DialogService;

    constructor(stateService: StateService, router: Router, route: ActivatedRoute, snackBarService: SnackBarService, dialogService: DialogService) {
        this.route = route;
        this.snackBarService = snackBarService;
        this.router = router;
        this.stateService = stateService;
        this.dialogService = dialogService;
    }
}
