import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'dashboard', loadChildren: () => import('./dashboard/DashboardModule').then(m => m.DashboardModule) },
    { path: 'posts', loadChildren: () => import('./posts/PostsModule').then(m => m.PostsModule) },
    { path: 'sites', loadChildren: () => import('./sites/SitesModule').then(m => m.SitesModule) },
    { path: 'sections', loadChildren: () => import('./sections/SectionsModule').then(m => m.SectionsModule) },
    { path: 'tags', loadChildren: () => import('./tags/TagsModule').then(m => m.TagsModule) },
    { path: 'pages', loadChildren: () => import('./pages/PagesModule').then(m => m.PagesModule) },
    { path: 'ads', loadChildren: () => import('./ads/AdsModule').then(m => m.AdsModule) },
    { path: 'menu', loadChildren: () => import('./menu/MenuModule').then(m => m.MenuModule) },
    { path: 'storage', loadChildren: () => import('./storage/StorageModule').then(m => m.StorageModule) },
    { path: '**', redirectTo: 'dashboard' }
];

const config: ExtraOptions = {};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
