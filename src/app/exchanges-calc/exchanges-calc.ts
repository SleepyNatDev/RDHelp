import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [MatFormField, MatSlideToggle, FormsModule, CommonModule, MatLabel, MatInput, MatButton,
    MatCardModule],
  selector: 'app-exchanges-calc',
  styleUrl: './exchanges-calc.scss',
  templateUrl: './exchanges-calc.html',
})
export class ExchangesCalc {
  starch_exch: string | number = '';
  fruit_exch: string | number = '';
  veg_exch: string | number = '';
  milk_exch: string | number = '';
  meat_exch: string | number = '';
  fat_exch: string | number = '';

  submitExchanges() {
    
  }
}
