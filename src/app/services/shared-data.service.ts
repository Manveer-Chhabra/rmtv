import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private searchInput = '';

  constructor() { }

  setSearchInput(searchInput){
    this.searchInput = searchInput;
  }

  getSearchInput(){
    return this.searchInput;
  }
}
