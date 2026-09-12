import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  loggedIn: Observable<boolean>;
  constructor(private authService: AuthenticationService, private router: Router) {
    this.loggedIn = this.authService.isLoggedIn;
    this.loggedIn.subscribe((val) => {
      if (!val) {
        this.router.navigate(['/login']);
      }
    });
    if (!this.authService.authenticated()) {
      this.router.navigate(['/login']);
    }
    this.authService.logout();
  }
}
