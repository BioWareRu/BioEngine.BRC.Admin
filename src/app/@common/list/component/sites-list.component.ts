import { SitesCacheProvider } from 'app/@services/cache/SitesCacheProvider';
import { Input, Component } from '@angular/core';

@Component({
    selector: 'sitesList',
    template: `
        <mat-chip-list *ngIf="Ids">
            <mat-chip selected *ngFor="let site of (provider.Get(Ids) | async).Values()">
                {{ site.Title }}
            </mat-chip>
        </mat-chip-list>
    `
})
export class SitesLabelsListComponent {
    @Input()
    public Ids: string[];
    constructor(public provider: SitesCacheProvider) {}
}
