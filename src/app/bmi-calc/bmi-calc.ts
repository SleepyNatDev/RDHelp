import { Component } from '@angular/core';
import { MatFormField, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';

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
  checked = false;

  //Freedom Units
  height_in = 0;
  height_ft = 0;
  weight_lbs = 0;
  
  //Metric Units
  height_cm = 0;
  weight_kgs = 0;

  //results
  kgpm = 0;

  submitFreedomUnits() {
    this.height_cm = this.truncateTwoDecimals(((this.height_ft * 12) + this.height_in) * 2.54);
    this.weight_kgs = this.truncateTwoDecimals((this.weight_lbs / 2.205));
    this.kgpm = this.truncateTwoDecimals((this.weight_lbs / Math.pow(this.height_ft * 12 + this.height_in, 2)) * 703);
  }

  submitMetricUnits() {
    this.height_in = this.truncateTwoDecimals(this.height_cm / 2.54 - (Math.floor((this.height_cm / 2.54) / 12) * 12));
    this.height_ft = this.truncateTwoDecimals(Math.floor((this.height_cm / 2.54) / 12));
    this.weight_lbs = this.truncateTwoDecimals(this.weight_kgs * 2.205);
    this.kgpm = this.truncateTwoDecimals(this.weight_kgs / Math.pow(this.height_cm / 100, 2));
  }

  truncateTwoDecimals(input:number) {
    return Math.trunc(input * 100) / 100;
  }
}
