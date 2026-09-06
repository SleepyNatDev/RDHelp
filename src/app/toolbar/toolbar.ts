import { Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";

@Component({
  imports: [MatToolbar, MatButton, MatIconButton, MatIcon, RouterLink],
  selector: 'app-toolbar',
  styleUrl: './toolbar.scss',
  templateUrl: './toolbar.html',
})
export class Toolbar {}
