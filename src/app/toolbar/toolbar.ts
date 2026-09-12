import { Component, effect, ElementRef, signal, ViewChild } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";
import { LocalStorage } from '../local-storage';
import { MatMenuModule } from '@angular/material/menu';
import { AuthenticationService } from '../authentication-service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  imports: [
    MatToolbar, 
    MatButton, 
    MatIconButton, 
    MatIcon, 
    RouterLink,
    MatMenuModule,
    CommonModule
  ],
  selector: 'app-toolbar',
  styleUrl: './toolbar.scss',
  templateUrl: './toolbar.html',
})
export class Toolbar {
  darkMode = signal(false);
  loggedIn: Observable<boolean>;

  constructor(private localStorageService: LocalStorage, private authService: AuthenticationService) {
    this.loggedIn = this.authService.isLoggedIn;
    if (this.localStorageService.get("darkMode") == "true") {
      this.darkMode.set(true);
      document.body.classList.toggle("dark-mode");
    }
    effect(() => {
      this.localStorageService.save("darkMode", String(this.darkMode()));
    });
  }

  toggleDarkMode() {
    this.darkMode.set(!this.darkMode());
    document.body.classList.toggle("dark-mode");
  }
}
