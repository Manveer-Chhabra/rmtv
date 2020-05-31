import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private searchInput = '';
  private guestSessionId;

  constructor() { }

  setSearchInput(searchInput){
    this.searchInput = searchInput;
  }

  getSearchInput(){
    return this.searchInput;
  }

  setGuestSessionId(id){
    this.guestSessionId = id;
  }

  getGuestSessionId(){
    return this.guestSessionId;
  }
}
