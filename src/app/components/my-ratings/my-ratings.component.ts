import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-my-ratings',
  templateUrl: './my-ratings.component.html',
  styleUrls: ['./my-ratings.component.scss']
})
export class MyRatingsComponent implements OnInit {
  loadedMovieData = false;
  loadedTvShowData = false;
  moviesPage = 1;
  tvShowsPage = 1;
  subscriptions = new Subscription();
  movieSearchResults;
  totalMovieResults;
  totalTvShowResults = 0;
  tvSearchResults = 0;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.loadRatedMovies();
    this.loadRatedTvShows();
  }

  loadRatedMovies() {
    this.subscriptions.add(
      this.sharedService.getRatedMovieResults(this.moviesPage).subscribe(data => {
        this.movieSearchResults = data.results;
        this.totalMovieResults = data.total_results;
        this.moviesPage++;
        this.loadedMovieData = true;
        // console.log(data);
      }, err => {
        console.log(err);
      }
      ));
  }

  loadRatedTvShows() {
    this.subscriptions.add(
      this.sharedService.getRatedTvResults(this.tvShowsPage).subscribe(data => {
        this.totalTvShowResults = data.total_results;
        this.tvSearchResults = data.results;
        this.loadedTvShowData = true;
        // console.log(data);
      }, err => {
        console.log(err);
      }
      ));
  }

}
