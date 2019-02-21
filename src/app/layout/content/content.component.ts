import { Component, ViewEncapsulation, HostBinding } from '@angular/core';
import { StateService } from 'app/@common/StateService';

@Component({
    selector: 'content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentComponent {
    @HostBinding('class.inner-scroll')
    public innerScroll = false;

    constructor(private _stateService: StateService) {
        this._stateService.onSidebarStateChange().subscribe(hidden => {
            this.innerScroll = !hidden;
        });
    }
}
