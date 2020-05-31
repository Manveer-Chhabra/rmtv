import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.scss']
})
export class TvShowDetailsComponent implements OnInit {

  tvShowId;
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  backgroundImageBaseUrl = 'https://image.tmdb.org/t/p/original';
  tvShowData;
  backgroundImage;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private sanitizer: DomSanitizer) {
    this.tvShowId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    console.log(this.tvShowId);
    this.sharedService.getTvShowDetails(this.tvShowId).subscribe(data => {
      console.log(data);
      this.tvShowData = data;
      const backdropImageUrl = `${this.backgroundImageBaseUrl}${this.tvShowData.backdrop_path}`;
      this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(`url(${backdropImageUrl})`);
    });
  }

}