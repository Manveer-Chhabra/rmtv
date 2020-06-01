import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { HomeComponent } from './components/home/home.component';
import { TvShowDetailsComponent } from './components/tv-show-details/tv-show-details.component';
import { MyRatingsComponent } from './components/my-ratings/my-ratings.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie', component: MovieDetailsComponent },
  { path: 'tv_show', component: TvShowDetailsComponent },
  { path: 'my_ratings', component: MyRatingsComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
