import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../authentication-service';

@Component({
  imports: [
    MatFormField,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
  ],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  @ViewChild('loginForm') loginForm!: NgForm;
  showPassword = false;
  loggedIn: any;

  constructor(private authService: AuthenticationService) {
    this.loggedIn = this.authService.isLoggedIn;
  }

  onSubmit() {
    this.authService.login(this.loginForm.value);
  }
}
