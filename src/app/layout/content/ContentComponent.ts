import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { StateService } from '@common/StateService';

@Component({
    selector: 'content',
    templateUrl: './ContentComponent.html',
    styleUrls: ['./ContentComponent.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentComponent {
    @HostBinding('class.inner-scroll')
    public innerScroll = false;

    constructor(private readonly _stateService: StateService) {
        this._stateService.onSidebarStateChange().subscribe(hidden => {
            this.innerScroll = !hidden;
        });
    }
}
