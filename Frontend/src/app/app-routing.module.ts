import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SearchComponentComponent} from "./search-component/search-component.component";
import {FavouritesComponentComponent} from "./favourites-component/favourites-component.component";


const routes: Routes = [
  {path: 'search', component: SearchComponentComponent},
  {path: 'favourites', component: FavouritesComponentComponent},
  {path: '', redirectTo: '/search', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
