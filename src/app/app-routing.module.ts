import { NgModule } from "@angular/core";
import { Routes, RouterModule, ActivatedRoute } from "@angular/router";
import { ListViewComponent } from "./components/list-view/list-view.component";
import { FULL_EPISODES_FILTER, SKITS_FILTER } from "./pipes";

// TODO: lazy loading pagination
// TODO: route params & sharable urls
// TODO: make Filter<T>

const routes: Routes = [
  {
    path: 'full-episodes',
    component: ListViewComponent,
    data: {
      filter: FULL_EPISODES_FILTER
    }
  },
  {
    path: 'skits',
    component: ListViewComponent,
    resolve: {
      filter: SKITS_FILTER
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/full-episodes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class TnzRoutingModule { }







//,
// {
//   path: '**',
//   component: FullEpisodesComponent // TODO: 404 "PageNotFoundComponent"
// }
