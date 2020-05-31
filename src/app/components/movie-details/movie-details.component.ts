import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieId;
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  backgroundImageBaseUrl = 'https://image.tmdb.org/t/p/original';
  movieData;
  backgroundImage;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private sanitizer: DomSanitizer) {
    this.movieId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    console.log(this.movieId);
    this.sharedService.getMovieDetails(this.movieId).subscribe(data => {
      console.log(data);
      this.movieData = data;
      const backdropImageUrl = `${this.backgroundImageBaseUrl}${this.movieData.backdrop_path}`;
      this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(`url(${backdropImageUrl})`);
    });
  }

}
