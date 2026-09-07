import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatCardModule, MatButton, RouterLink],
  selector: 'app-main',
  styleUrl: './main.scss',
  templateUrl: './main.html',
})
export class Main {
}
