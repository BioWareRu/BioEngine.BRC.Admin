import { NgModule } from '@angular/core';
import { BrcPerfectScrollbarDirective } from '@common/scroll/BrcPerfectScrollbarDirective';
import { UserComponent } from '@common/user/UserComponent';
import { BioCommonModule, BioDialogsModule, BioNotificationsModule } from 'bioengine-angular';

@NgModule({
    declarations: [UserComponent, BrcPerfectScrollbarDirective],
    imports: [BioCommonModule, BioNotificationsModule, BioDialogsModule],
    exports: [UserComponent, BrcPerfectScrollbarDirective, BioNotificationsModule, BioDialogsModule]
})
export class BrcCommonModule {

}
