import {NgModule} from '@angular/core';
import {ListTableComponent} from './list/component/list.component';
import {CommonModule} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterModule} from '@angular/router';
import {MomentModule} from 'ngx-moment';
import {NbCardModule} from '@nebular/theme';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  declarations: [
    ListTableComponent,
  ],
  exports: [
    ListTableComponent,
  ],
  providers: [],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule,
    MomentModule,
    NbCardModule,
    AngularFontAwesomeModule,
  ],
})
export class BioCommonModule {

}
