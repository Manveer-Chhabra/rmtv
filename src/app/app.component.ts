import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';
import { SharedDataService } from './services/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'rmtv';

  constructor(private sharedService: SharedService, private sharedDataService: SharedDataService) {
    this.sharedService.getGuestSessionId().subscribe(data => {
      this.sharedDataService.setGuestSessionId(data['guest_session_id']);
    });
  }

}
