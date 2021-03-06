import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperFormPageComponent } from './developers/form/DeveloperFormPageComponent';
import { GameFormPageComponent } from './games/form/GameFormPageComponent';
import { SectionsListComponent } from './list/SectionsListComponent';
import { TopicFormPageComponent } from './topics/form/TopicFormPageComponent';

const routes: Routes = [
    {
        path: 'list',
        component: SectionsListComponent
    },
    {
        path: 'list/:type',
        component: SectionsListComponent
    },
    {
        path: 'developers/add',
        component: DeveloperFormPageComponent
    },
    {
        path: 'developers/:id/edit',
        component: DeveloperFormPageComponent
    },
    {
        path: 'games/add',
        component: GameFormPageComponent
    },
    {
        path: 'games/:id/edit',
        component: GameFormPageComponent
    },
    {
        path: 'topics/add',
        component: TopicFormPageComponent
    },
    {
        path: 'topics/:id/edit',
        component: TopicFormPageComponent
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SectionsRoutingModule {}
