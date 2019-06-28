import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AbstractContentFormComponent, DialogService, Page, PagesService, PropertiesService, SitesService, SnackBarService } from 'bioengine-angular';

@Component({
    selector: 'page-form',
    templateUrl: './PageFormComponent.html'
})
export class PageFormComponent extends AbstractContentFormComponent<Page, PagesService> {
    public constructor(
        public sitesService: SitesService,
        snackBarService: SnackBarService,
        pagesService: PagesService,
        dialogsService: DialogService,
        propertiesService: PropertiesService
    ) {
        super(dialogsService, propertiesService, snackBarService, pagesService);
    }

    protected _constructForm(): void {
        super._constructForm();
        this.registerFormControl('siteIds', [Validators.required]);
    }
}
