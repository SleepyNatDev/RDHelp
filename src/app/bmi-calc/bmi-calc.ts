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
  height_in: string | number = '';
  height_ft: string | number = '';
  weight_lbs: string | number = '';
  
  //Metric Units
  height_cm: string | number = '';
  weight_kgs: string | number = '';

  //results
  kgpm = 0;

  submitFreedomUnits() {
    var validIn: number = +this.height_in;
    var validFt: number = +this.height_ft;
    var validLbs: number = +this.weight_lbs;
    var validCm: number = (validFt * 12 + validIn) * 2.54;
    var validKgs: number = (validLbs / 2.205);
    this.height_cm = this.truncateTwoDecimals(validCm);
    this.weight_kgs = validKgs = this.truncateTwoDecimals(validKgs);
    this.kgpm = this.truncateTwoDecimals(validKgs / Math.pow(validCm / 100, 2));
  }

  submitMetricUnits() {
    var validCm: number = +this.height_cm;
    var validKgs: number = +this.weight_kgs;
    this.height_in = this.truncateTwoDecimals(validCm / 2.54 - (Math.floor((validCm / 2.54) / 12) * 12));
    this.height_ft = this.truncateTwoDecimals(Math.floor((validCm / 2.54) / 12));
    this.weight_lbs = this.truncateTwoDecimals(validKgs * 2.205);
    this.kgpm = this.truncateTwoDecimals(validKgs / Math.pow(validCm / 100, 2));
  }

  isNaN(value: number): boolean {
    return Number.isNaN(value);
  }

  truncateTwoDecimals(input:number) {
    return Math.trunc(input * 100) / 100;
  }
}
