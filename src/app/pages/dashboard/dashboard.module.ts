import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {DashboardComponent} from './dashboard.component';
import {StatusCardComponent} from "./status-card/status-card.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [
    ThemeModule,
    RouterModule,
    FontAwesomeModule
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent
  ],
})
export class DashboardModule {
}
