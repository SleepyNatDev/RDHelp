import { Component, effect, ElementRef, signal, ViewChild } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";
import { NgbDropdown, NgbDropdownButtonItem, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap/dropdown';
import { LocalStorage } from '../local-storage';

@Component({
  imports: [
    MatToolbar, 
    MatButton, 
    MatIconButton, 
    MatIcon, 
    RouterLink,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbDropdownButtonItem
  ],
  selector: 'app-toolbar',
  styleUrl: './toolbar.scss',
  templateUrl: './toolbar.html',
})
export class Toolbar {
  darkMode = signal(false);
  constructor(localStorageService: LocalStorage) {
    if (localStorageService.get("darkMode") == "true") {
      this.darkMode.set(true);
      document.body.classList.toggle("dark-mode");
    }
    effect(() => {
      localStorageService.save("darkMode", String(this.darkMode()));
    });
  }

  toggleDarkMode() {
    this.darkMode.set(!this.darkMode());
    document.body.classList.toggle("dark-mode");
  }
}
