import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    { path: 'posts', loadChildren: './posts/posts.module#PostsModule' },
    { path: 'sites', loadChildren: './sites/sites.module#SitesModule' },
    { path: 'sections', loadChildren: './sections/sections.module#SectionsModule' },
    { path: 'tags', loadChildren: './tags/tags.module#TagsModule' },
    { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
    { path: 'menu', loadChildren: './menu/menu.module#MenuModule' },
    { path: 'storage', loadChildren: './storage/storage.module#StorageModule' },
    { path: '**', redirectTo: 'dashboard' }
];

const config: ExtraOptions = {};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
