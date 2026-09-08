import { Component, signal, effect } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LocalStorage } from '../local-storage';

@Component({
  imports: [MatFormField, MatSlideToggle, FormsModule, CommonModule, MatLabel, MatInput, MatButton,
    MatCardModule
  ],
  selector: 'app-bmi-calc',
  styleUrl: './bmi-calc.scss',
  templateUrl: './bmi-calc.html',
})
export class BmiCalc {

  //in to cm switch
  checked = signal(false);

  //Freedom Units
  height_in: string | number = '';
  height_ft: string | number = '';
  weight_lbs: string | number = '';
  
  //Metric Units
  height_cm: string | number = '';
  weight_kgs: string | number = '';

  //results
  kgpm = 0;

  resetUnits() {
    this.height_cm = '';
    this.height_ft = '';
    this.height_in = '';
    this.weight_kgs = '';
    this.weight_lbs = '';
  }

  constructor(localStorageService: LocalStorage) {
    if (localStorageService.get('metric') == 'true')
      this.checked.set(true);
    effect(() => {
      localStorageService.save('metric', this.checked() ? 'true' : 'false');
    });
  }

  submitFreedomUnits() {
    this.height_cm = Math.trunc((+this.height_ft * 12 + +this.height_in) * 2.54);
    this.weight_kgs = Math.trunc(+this.weight_lbs / 2.205);
    this.kgpm = this.truncateTwoDecimals(+this.weight_kgs / Math.pow(+this.height_cm / 100, 2));
  }

  submitMetricUnits() {
    this.height_in = Math.trunc(+this.height_cm / 2.54 - (Math.floor((+this.height_cm / 2.54) / 12) * 12));
    this.height_ft = Math.trunc(Math.floor((+this.height_cm / 2.54) / 12));
    this.weight_lbs = Math.trunc(+this.weight_kgs * 2.205);
    this.kgpm = this.truncateTwoDecimals(+this.weight_kgs / Math.pow(+this.height_cm / 100, 2));
  }

  isNaN(value: number): boolean {
    return Number.isNaN(value);
  }

  truncateTwoDecimals(input:number) {
    return Math.trunc(input * 100) / 100;
  }
}
