import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() search = new EventEmitter();
  value = '';
  constructor() { }

  ngOnInit(): void {
  }

  onEnterKey($event){
    this.search.emit(this.value);
  }
}
