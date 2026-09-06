import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatCard, MatButton, RouterLink],
  selector: 'app-main',
  styleUrl: './main.scss',
  templateUrl: './main.html',
})
export class Main {
}
