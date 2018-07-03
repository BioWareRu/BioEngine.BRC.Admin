import {NgModule} from '@angular/core';
import {ListTableComponent} from './list/component/list.component';
import {CommonModule} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterModule} from '@angular/router';
import {MomentModule} from 'ngx-moment';
import 'moment/locale/ru';
import {NbCardModule} from '@nebular/theme';
import {BioFormsModule} from "./forms/FormsModule";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

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
    BioFormsModule,
    FontAwesomeModule
  ],
})
export class BioCommonModule {

}
