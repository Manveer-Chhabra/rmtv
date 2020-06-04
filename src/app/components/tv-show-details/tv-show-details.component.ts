import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.scss']
})
export class TvShowDetailsComponent implements OnInit, OnDestroy {
  tvShowId;
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  backgroundImageBaseUrl = 'https://image.tmdb.org/t/p/original';
  tvShowData;
  backgroundImage;
  loadedTvShowData = false;
  subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private sanitizer: DomSanitizer,
    private notificationService: NotificationService) {
    this.tvShowId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.sharedService.getTvShowDetails(this.tvShowId).subscribe(data => {
        this.tvShowData = data;
        this.loadedTvShowData = true;
        const backdropImageUrl = `${this.backgroundImageBaseUrl}${this.tvShowData.backdrop_path}`;
        this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(`url(${backdropImageUrl})`);
      }, err => {
        console.log(err);
        this.notificationService.showNotification('Fetch Tv show service Failed. Please refresh.', 'error');
        this.loadedTvShowData = true;
      }));
  }

  addRating($event) {
    this.sharedService.addTvShowRating(this.tvShowId, $event.value).subscribe(data => {
      this.notificationService.showNotification('TV show rating added successfully.', 'success');
    }, err => {
      this.notificationService.showNotification('Fetch tv show service Failed. Please refresh.', 'error');
      console.log(err);
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
