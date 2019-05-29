import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule) },
    { path: 'sites', loadChildren: () => import('./sites/sites.module').then(m => m.SitesModule) },
    { path: 'sections', loadChildren: () => import('./sections/sections.module').then(m => m.SectionsModule) },
    { path: 'tags', loadChildren: () => import('./tags/tags.module').then(m => m.TagsModule) },
    { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
    { path: 'ads', loadChildren: () => import('./ads/ads.module').then(m => m.AdsModule) },
    { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
    { path: 'storage', loadChildren: () => import('./storage/storage.module').then(m => m.StorageModule) },
    { path: '**', redirectTo: 'dashboard' }
];

const config: ExtraOptions = {};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
