import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { combineLatest, forkJoin } from 'rxjs';

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

  constructor(private sharedService: SharedService) {
    this.movieScrollCallback = this.moviesScrolled.bind(this);
  }

  ngOnInit(): void {
  }

  onSearch($event){
    this.searchText = $event;
    this.moviesPage = 1;
    this.tvShowsPage = 1;
    this.loadMovies();
    this.loadTvShows();
  }

  loadMovies(){
    this.sharedService.getFilteredMovieResults(this.searchText, this.moviesPage).subscribe(data =>
      {
      console.log(data);
      const movieData = data.results;
      this.movieSearchResults = movieData;
      this.moviesPage++;
    }, err =>
    {
      console.log(err);
    }
    );
  }

  loadTvShows(){
    this.sharedService.getFilteredTvShowResults(this.searchText, this.tvShowsPage).subscribe(data =>
      {
      console.log(data);
      const tvData = data.results;
      this.tvSearchResults = tvData;
    }, err =>
    {
      console.log(err);
    }
    );
  }

  moviesScrolled() {
    return this.sharedService.getFilteredMovieResults(this.searchText, this.moviesPage).subscribe( data => {
      this.moviesPage++;
      this.movieSearchResults = this.movieSearchResults.concat(data.results);
    }
    );
    }

    tvShowsScrolled(){
      return this.sharedService.getFilteredTvShowResults(this.searchText, this.tvShowsPage).subscribe( data => {
        this.tvShowsPage++;
        this.tvSearchResults = this.tvSearchResults.concat(data.results);
      });
  }

  ngOnDestroy(){

  }
}
