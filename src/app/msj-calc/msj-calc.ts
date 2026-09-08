import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { LocalStorage } from '../local-storage';

@Component({
  imports: [MatSlideToggleModule, CommonModule, MatLabel, MatCardModule,
    MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule,
    MatStepperModule, ReactiveFormsModule, MatSelectModule
  ],
  selector: 'app-msj-calc',
  styleUrl: './msj-calc.scss',
  templateUrl: './msj-calc.html',
})
export class MsjCalc {
  checked = signal(false);

  //Freedom Units
  height_in: string | number = '';
  height_ft: string | number = '';
  weight_lbs: string | number = '';
  
  //Metric Units
  height_cm: string | number = '';
  weight_kgs: string | number = '';

  unit_age: string | number = '';

  //1 Female, 2 Male
  assignedSex = 0;
  //Ranges from 1.2 to 1.9
  activityLevel = 0;

  bmr = 0;
  tdee = 0;

  constructor(localStorageService: LocalStorage) {
    if (localStorageService.get('metric') == 'true')
      this.checked.set(true);
    effect(() => {
      localStorageService.save('metric', this.checked() ? 'true' : 'false');
    });
  }

  isNaN(value: number) {
    return Number.isNaN(value);
  }

  resetUnits() {
    this.height_cm = '';
    this.height_ft = '';
    this.height_in = '';
    this.weight_kgs = '';
    this.weight_lbs = '';
    this.assignedSex = 0;
    this.activityLevel = 0;
    this.unit_age = '';
    this.bmr = 0;
    this.tdee = 0;
  }

  submitFreedomUnits() {
    this.height_cm = Math.trunc((+this.height_ft * 12 + +this.height_in) * 2.54);
    this.weight_kgs = Math.trunc(+this.weight_lbs / 2.205);
    var sexDiff = this.assignedSex == 1 ? -161 : 5
    this.bmr = (10 * +this.weight_kgs) + (6.25 * +this.height_cm) - (5 * +this.unit_age) + sexDiff;
    this.tdee = this.bmr * this.activityLevel;
  }

  submitMetricUnits() {
    this.height_in = Math.trunc(+this.height_cm / 2.54 - (Math.floor((+this.height_cm / 2.54) / 12) * 12));
    this.height_ft = Math.trunc(Math.floor((+this.height_cm / 2.54) / 12));
    this.weight_lbs = Math.trunc(+this.weight_kgs * 2.205);
    var sexDiff = this.assignedSex == 1 ? -161 : 5
    this.bmr = (10 * +this.weight_kgs) + (6.25 * +this.height_cm) - (5 * +this.unit_age) + sexDiff;
    this.tdee = this.bmr * this.activityLevel;
  }

  truncateTwoDecimals(input:number) {
    return Math.trunc(input * 100) / 100;
  }
}

export class matSelectErrorState implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    // ORIGINAL
    // return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    // Eager
    return !!(control && control.invalid);
  }
}