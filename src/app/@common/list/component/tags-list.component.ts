import { Input, Component } from '@angular/core';
import { TagsCacheProvider } from 'app/@services/cache/TagsCacheProvider';

@Component({
    selector: 'tagsList',
    template: `
        <mat-chip-list *ngIf="Ids">
            <mat-chip
                selected
                *ngFor="let tag of (provider.Get(Ids) | async).Values()"
                title="{{ tag.Name }}"
            >
                {{ tag.Name | truncate: 30 }}
            </mat-chip>
        </mat-chip-list>
    `
})
export class TagsLabelsListComponent {
    @Input()
    public Ids: string[];
    constructor(public provider: TagsCacheProvider) {}
}
