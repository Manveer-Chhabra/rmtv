import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movieId;
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  backgroundImageBaseUrl = 'https://image.tmdb.org/t/p/original';
  movieData;
  backgroundImage;
  loadedMovieData = false;
  movieRating;
  subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private sanitizer: DomSanitizer,
    private notificationService: NotificationService) {
    this.movieId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.sharedService.getMovieDetails(this.movieId).subscribe(data => {
        this.movieData = data;
        this.loadedMovieData = true;
        const backdropImageUrl = `${this.backgroundImageBaseUrl}${this.movieData.backdrop_path}`;
        this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(`url(${backdropImageUrl})`);
      }, err => {
        console.log(err);
        this.notificationService.showNotification('Fetch movie details service failed. Please refresh.', 'error');
        this.loadedMovieData = true;
      }));
  }

  addRating($event) {
    this.sharedService.addMovieRating(this.movieId, $event.value).subscribe(data => {
      this.notificationService.showNotification('Movie rating added successfully.', 'success');
    }, err => {
      this.notificationService.showNotification('Fetch movies service failed. Please refresh.', 'error');
      console.log(err);
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
