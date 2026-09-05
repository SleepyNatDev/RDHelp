import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Main } from './main/main';
import { Toolbar } from './toolbar/toolbar';

@Component({
  imports: [RouterOutlet, Main, Toolbar],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('RDHelp');
}
