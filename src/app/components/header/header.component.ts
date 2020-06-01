import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'RMTV';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToHome(){
    this.router.navigate(['']);
  }

  goToMyRatings(){
    this.router.navigate(['/my_ratings']);
  }

}
