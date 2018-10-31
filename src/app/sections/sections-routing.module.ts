import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SectionsListComponent} from './list/list.component';
import {DeveloperFormComponent} from './developers/form/form.component';
import {GameFormComponent} from './games/form/form.component';
import {TopicFormComponent} from './topics/form/form.component';

const routes: Routes = [
    {
        path: 'list',
        component: SectionsListComponent,
    },
    {
        path: 'list/:type',
        component: SectionsListComponent,
    },
    {
        path: 'developers/add',
        component: DeveloperFormComponent,
    },
    {
        path: 'developers/:id/edit',
        component: DeveloperFormComponent
    },
    {
        path: 'games/add',
        component: GameFormComponent,
    },
    {
        path: 'games/:id/edit',
        component: GameFormComponent
    },
    {
        path: 'topics/add',
        component: TopicFormComponent,
    },
    {
        path: 'topics/:id/edit',
        component: TopicFormComponent
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SectionsRoutingModule {
}
