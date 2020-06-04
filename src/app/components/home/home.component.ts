import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { combineLatest, forkJoin, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { NotificationService } from 'src/app/services/notification.service';

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
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  searchText;
  totalMovieResults;
  totalTvShowResults;
  searched = false;
  loadedMovieData = false;
  loadedTvShowData = false;
  private subscriptions = new Subscription();
  selectedTab = 'movie';

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private sharedDataService: SharedDataService,
    private notificationService: NotificationService) {
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
        this.notificationService.showNotification('Fetch movies service Failed. Please refresh.', 'error');
        console.log(err);
      }
      ));
  }

  loadTvShows() {
    this.subscriptions.add(
      this.sharedService.getFilteredTvShowResults(this.searchText, this.tvShowsPage).subscribe(data => {
        this.totalTvShowResults = data.total_results;
        this.tvSearchResults = data.results;
        this.tvShowsPage++;
        this.loadedTvShowData = true;
      }, err => {
        this.notificationService.showNotification('Fetch Tv Shows Service Failed. Please refresh.', 'error');
        console.log(err);
      }
      ));
  }

  moviesScrolled() {
    return this.subscriptions.add(this.sharedService.getFilteredMovieResults(this.searchText, this.moviesPage).subscribe(data => {
      this.moviesPage++;
      this.movieSearchResults = this.movieSearchResults.concat(data.results);
    }, err => {
      this.notificationService.showNotification('Fetch movies service failed. Please refresh.', 'error');
      console.log(err);
    }
    ));
  }

  tvShowsScrolled() {
    return this.subscriptions.add(this.sharedService.getFilteredTvShowResults(this.searchText, this.tvShowsPage).subscribe(data => {
      this.tvShowsPage++;
      this.tvSearchResults = this.tvSearchResults.concat(data.results);
    }, err => {
      this.notificationService.showNotification('Fetch Tv shows service failed. Please refresh.', 'error');
      console.log(err);
    }));
  }

  goToMovieDetails(movie) {
    this.router.navigate(['/movie', { id: movie.id }]);
  }

  goToTvShowDetails(tvShow) {
    this.router.navigate(['/tv_show', { id: tvShow.id }]);
  }

  selectTab(selectedTab){
    this.selectedTab = selectedTab;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
