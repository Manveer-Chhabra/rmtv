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
  const sessionId = sessionStorage.getItem("guestSessionId");
  if (!sessionId){
    this.sharedService.getGuestSessionId().subscribe(data => {
      this.sharedDataService.setGuestSessionId(data['guest_session_id']);
      sessionStorage.setItem("guestSessionId", data['guest_session_id']);
    });
  } else {
    this.sharedDataService.setGuestSessionId(sessionId);
  }
  }

}
