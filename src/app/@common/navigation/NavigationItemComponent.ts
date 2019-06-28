import { Component, HostBinding, Input } from '@angular/core';
import { NavigationItem } from './NavigationItem';

@Component({
    selector: 'nav-item',
    templateUrl: './NavigationItemComponent.html',
    styleUrls: ['./NavigationItemComponent.scss']
})
export class NavigationItemComponent {
    @Input() item: NavigationItem;

    @HostBinding('class')
    classes = 'nav-item';
}
