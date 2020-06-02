import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { combineLatest, forkJoin, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

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
  searchText;
  totalMovieResults;
  totalTvShowResults;
  searched = false;
  loadedMovieData = false;
  loadedTvShowData = false;
  private subscriptions = new Subscription();

  constructor(private sharedService: SharedService, private router: Router, private sharedDataService: SharedDataService) {
  }

  ngOnInit(): void {
    this.searchText = this.sharedDataService.getSearchInput();
    if (this.searchText) {
      this.getMoviesAndTvShowData();
    }
  }

  onSearch($event) {
    this.searchText = $event;
    if (this.searchText) {
      this.sharedDataService.setSearchInput(this.searchText);
      this.getMoviesAndTvShowData();
    }
  }

  getMoviesAndTvShowData() {
    this.searched = true;
    this.loadedMovieData = false;
    this.loadedTvShowData = false;
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
    }, err => {
      console.log(err);
    }
    ));
  }

  tvShowsScrolled() {
    return this.subscriptions.add(this.sharedService.getFilteredTvShowResults(this.searchText, this.tvShowsPage).subscribe(data => {
      this.tvShowsPage++;
      this.tvSearchResults = this.tvSearchResults.concat(data.results);
    }, err => {
      console.log(err);
    }));
  }

  goToMovieDetails(movie) {
    this.router.navigate(['/movie', { id: movie.id }]);
  }

  goToTvShowDetails(movie) {
    this.router.navigate(['/tv_show', { id: movie.id }]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
