import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
    {path: 'content', loadChildren: 'app/content/content.module#ContentModule'},
    {path: 'sites', loadChildren: 'app/sites/sites.module#SitesModule'},
    {path: 'sections', loadChildren: 'app/sections/sections.module#SectionsModule'},
    {path: 'tags', loadChildren: 'app/tags/tags.module#TagsModule'},
    {path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule'},
    {path: 'menu', loadChildren: 'app/menu/menu.module#MenuModule'},
    {path: '**', redirectTo: 'dashboard'},
];

const config: ExtraOptions = {};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
