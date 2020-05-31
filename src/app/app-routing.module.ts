import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { HomeComponent } from './components/home/home.component';
import { TvShowDetailsComponent } from './components/tv-show-details/tv-show-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie', component: MovieDetailsComponent },
  { path: 'tv_show', component: TvShowDetailsComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
