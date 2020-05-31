import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { combineLatest, forkJoin, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  moviesPage = 1;
  tvShowsPage = 1;
  movieSearchResults = [];
  tvSearchResults = [];
  imageBaseUrl = 'https://image.tmdb.org/t/p/w200';
  movieScrollCallback;
  searchText;
  totalMovieResults;
  totalTvShowResults;
  searched = false;
  loadedMovieData = false;
  loadedTvShowData = false;
  private subscriptions = new Subscription();

  constructor(private sharedService: SharedService, private router: Router) {
    this.movieScrollCallback = this.moviesScrolled.bind(this);
  }

  ngOnInit(): void {
  }

  onSearch($event) {
    this.searched = true;
    this.loadedMovieData = false;
    this.loadedTvShowData = false;
    this.searchText = $event;
    this.moviesPage = 1;
    this.tvShowsPage = 1;
    this.loadMovies();
    this.loadTvShows();
  }

  loadMovies() {
    this.subscriptions.add(
    this.sharedService.getFilteredMovieResults(this.searchText, this.moviesPage).subscribe(data => {
      this.movieSearchResults = data.results;
      this.totalMovieResults = data.total_results;
      this.moviesPage++;
      this.loadedMovieData = true;
    }, err => {
      console.log(err);
    }
    ));
  }

  loadTvShows() {
    this.subscriptions.add(
    this.sharedService.getFilteredTvShowResults(this.searchText, this.tvShowsPage).subscribe(data => {
      this.totalTvShowResults = data.total_results;
      this.tvSearchResults = data.results;
      this.loadedTvShowData = true;
    }, err => {
      console.log(err);
    }
    ));
  }

  moviesScrolled() {
    return this.subscriptions.add(this.sharedService.getFilteredMovieResults(this.searchText, this.moviesPage).subscribe(data => {
      this.moviesPage++;
      this.movieSearchResults = this.movieSearchResults.concat(data.results);
    }
    ));
  }

  tvShowsScrolled() {
    return this.subscriptions.add(this.sharedService.getFilteredTvShowResults(this.searchText, this.tvShowsPage).subscribe(data => {
      this.tvShowsPage++;
      this.tvSearchResults = this.tvSearchResults.concat(data.results);
    }));
  }

  goToMovieDetails(movie){
    console.log(movie);
    this.router.navigate(['/movie',  { id: movie.id }]);
  }

  goToTvShowDetails(movie){
    console.log(movie);
    this.router.navigate(['/tv_show',  { id: movie.id }]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
