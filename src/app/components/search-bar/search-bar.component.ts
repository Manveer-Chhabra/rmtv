import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() searchInput;
  @Output() search = new EventEmitter();
  value = '';
  constructor() { }

  ngOnInit(): void {
    this.value = this.searchInput;
  }

  onEnterKey($event){
    this.search.emit(this.value);
  }
}
