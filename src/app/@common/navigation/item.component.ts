import { Component, HostBinding, Input } from '@angular/core';
import { NavigationItem } from './NavigationItem';

@Component({
    selector: 'nav-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class NavigationItemComponent {
    @Input() item: NavigationItem;

    @HostBinding('class')
    classes = 'nav-item';
}
