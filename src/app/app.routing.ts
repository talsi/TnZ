/**
 * Created by talsi on 17/09/2016.
 */

import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {FullEpisodesComponent, SkitsComponent} from "./components";

// TODO: full-episodes share component with skits
// TODO: use resolve service
// TODO: lazy loading pagination

const appRoutes: Routes = [
    {
        path: 'full-episodes',
        component: FullEpisodesComponent
    },
    {
        path: 'skits',
        component: SkitsComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/full-episodes'
    },
    {
        path: '**',
        component: FullEpisodesComponent // TODO: 404 "PageNotFoundComponent"
    }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
