import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListViewComponent } from "./components/list-view/list-view.component";
import { SKITS, FULL_EPISODES } from "./pipes";

const routes: Routes = [
  {
    path: 'full-episodes',
    component: ListViewComponent,
    data: { filter: FULL_EPISODES }
  },
  {
    path: 'skits',
    component: ListViewComponent,
    data: { filter: SKITS }
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





// TODO: route params & sharable urls
// TODO: 404 "PageNotFoundComponent"
// {
//   path: '**',
//   component: FullEpisodesComponent
// }
