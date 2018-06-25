import {NgModule} from '@angular/core';
import {ListTableComponent} from './list/component/list.component';
import {CommonModule} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterModule} from '@angular/router';
import {MomentModule} from 'ngx-moment';
import 'moment/locale/ru';
import {NbCardModule} from '@nebular/theme';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {BioFormsModule} from "./forms/FormsModule";

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
    BioFormsModule
  ],
})
export class BioCommonModule {

}
