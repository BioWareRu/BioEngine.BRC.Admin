import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule'},
  {path: 'content', loadChildren: 'app/content/content.module#ContentModule'},
  {path: 'sites', loadChildren: 'app/sites/sites.module#SitesModule'},
  {path: 'sections', loadChildren: 'app/sections/sections.module#SectionsModule'},
  {path: '', redirectTo: 'pages', pathMatch: 'full'},
  {path: '**', redirectTo: 'pages'},
];

const config: ExtraOptions = {};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
