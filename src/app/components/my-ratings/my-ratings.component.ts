import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-my-ratings',
  templateUrl: './my-ratings.component.html',
  styleUrls: ['./my-ratings.component.scss']
})
export class MyRatingsComponent implements OnInit, OnDestroy {
  loadedMovieData = false;
  loadedTvShowData = false;
  moviesPage = 1;
  tvShowsPage = 1;
  subscriptions = new Subscription();
  movieSearchResults;
  totalMovieResults = 0;
  totalTvShowResults = 0;
  tvSearchResults;
  selectedTab = 'movie';
  imageBaseUrl = 'https://image.tmdb.org/t/p/w200';

  constructor(
    private sharedService: SharedService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    if (this.sharedDataService.getGuestSessionId()) {
      this.loadRatedMovies();
      this.loadRatedTvShows();
    } else {
      this.router.navigate(['']);
    }

  }

  loadRatedMovies() {
    this.subscriptions.add(
      this.sharedService.getRatedMovieResults(this.moviesPage).subscribe(data => {
        this.movieSearchResults = data.results;
        this.totalMovieResults = data.total_results;
        this.moviesPage++;
        this.loadedMovieData = true;
      }, err => {
        this.notificationService.showNotification('Fetch rated movies service Failed. Please refresh.', 'error');
        console.log(err);
      }
      ));
  }

  loadRatedTvShows() {
    this.subscriptions.add(
      this.sharedService.getRatedTvResults(this.tvShowsPage).subscribe(data => {
        this.totalTvShowResults = data.total_results;
        this.tvSearchResults = data.results;
        this.tvShowsPage++;
        this.loadedTvShowData = true;
      }, err => {
        this.notificationService.showNotification('Fetch rated Tv shows service failed. Please refresh.', 'error');
        console.log(err);
      }
      ));
  }

  moviesScrolled() {
    return this.subscriptions.add(this.sharedService.getRatedMovieResults(this.moviesPage).subscribe(data => {
      this.moviesPage++;
      this.movieSearchResults = this.movieSearchResults.concat(data.results);
    }, err => {
      this.notificationService.showNotification('Fetch rated movies service failed. Please refresh.', 'error');
      console.log(err);
    }
    ));
  }

  tvShowsScrolled() {
    return this.subscriptions.add(this.sharedService.getRatedTvResults(this.tvShowsPage).subscribe(data => {
      this.tvShowsPage++;
      this.tvSearchResults = this.tvSearchResults.concat(data.results);
    }, err => {
      this.notificationService.showNotification('Fetch rated Tv shows service failed. Please refresh.', 'error');
      console.log(err);
    }));
  }

  selectTab(selectedTab) {
    this.selectedTab = selectedTab;
  }

  goToMovieDetails(movie) {
    this.router.navigate(['/movie', { id: movie.id }]);
  }

  goToTvShowDetails(tvShow) {
    this.router.navigate(['/tv_show', { id: tvShow.id }]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
