import { Input, Component } from '@angular/core';
import { SectionsCacheProvider } from 'app/@services/cache/SectionsCacheProvider';

@Component({
    selector: 'sectionsList',
    template: `
        <mat-chip-list *ngIf="Ids">
            <mat-chip
                selected
                *ngFor="let section of (provider.Get(Ids) | async).Values()"
                title="{{ section.Title }}"
            >
                {{ section.Title | truncate: 30 }}
            </mat-chip>
        </mat-chip-list>
    `
})
export class SectionsLabelsListComponent {
    @Input()
    public Ids: string[];
    constructor(public provider: SectionsCacheProvider) {}
}
