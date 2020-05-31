import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseURL = 'https://api.themoviedb.org/3/';
  apiKey = '6bf8f692e90be1e321451eec713f8bc6';
  constructor(private httpService: HttpClient) { }

  getFilteredMovieResults(searchQuery, page): Observable<any>{
    return this.httpService.get(`${this.baseURL}search/movie?query=${searchQuery}&api_key=${this.apiKey}&page=${page}`);
  }

  getFilteredTvShowResults(searchQuery, page): Observable<any>{
    return this.httpService.get(`${this.baseURL}search/tv?query=${searchQuery}&api_key=${this.apiKey}&page=${page}`);
  }

  getMovieDetails(movieId){
    return this.httpService.get(`${this.baseURL}movie/${movieId}?api_key=${this.apiKey}`);
  }

  getTvShowDetails(tvShowId){
    return this.httpService.get(`${this.baseURL}tv/${tvShowId}?api_key=${this.apiKey}`);
  }
}
