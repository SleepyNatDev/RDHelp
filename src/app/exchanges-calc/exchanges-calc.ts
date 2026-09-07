import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  imports: [MatFormField, FormsModule, CommonModule, MatLabel, MatInput, MatButton,
    MatCardModule, MatTableModule],
  selector: 'app-exchanges-calc',
  styleUrl: './exchanges-calc.scss',
  templateUrl: './exchanges-calc.html',
})
export class ExchangesCalc {
  @ViewChild('resultTable') resultTable!: ElementRef;
  starch_in: string | number = '';
  fruit_in: string | number = '';
  veg_in: string | number = '';
  milk_in: string | number = '';
  meat_in: string | number = '';
  fat_in: string | number = '';
  checked = false;

  carbs_exch: exchanges = {
    label: 'Carbs',
    grams: 0,
    calories: 0,
    percent: 0
  }

  proteins_exch: exchanges = {
    label: 'Proteins',
    grams: 0,
    calories: 0,
    percent: 0
  }

  fats_exch: exchanges = {
    label: 'Fats',
    grams: 0,
    calories: 0,
    percent: 0
  }

  starch_rates: exch_rates = {
    carbs_grams: 15,
    proteins_grams: 3,
    fats_grams: 1,
    total_grams: 19,
    calories: 80
  }

  vegetable_rates: exch_rates = {
    carbs_grams: 5,
    proteins_grams: 2,
    fats_grams: 0,
    total_grams: 7,
    calories: 25
  }

  fruit_rates: exch_rates = {
    carbs_grams: 15,
    proteins_grams: 0,
    fats_grams: 0,
    total_grams: 15,
    calories: 60
  }

  milk_rates: exch_rates = {
    carbs_grams: 12,
    proteins_grams: 8,
    fats_grams: 8,
    total_grams: 28,
    calories: 160
  }

  meat_rates: exch_rates = {
    carbs_grams: 0,
    proteins_grams: 7,
    fats_grams: 5,
    total_grams: 12,
    calories: 75
  }

  fat_rates: exch_rates = {
    carbs_grams: 0,
    proteins_grams: 0,
    fats_grams: 5,
    total_grams: 5,
    calories: 45
  }

  total_calories = 0;

  arrExchanges = [this.carbs_exch, this.proteins_exch, this.fats_exch];
  displayedColumns: string[] = ['label', 'grams', 'calories', 'percent'];

  submitExchanges() {
    this.resetExcanges();
    //starch calc
    var validStarch = +this.starch_in;
    this.addExchange(this.starch_rates, validStarch);
    //veg calc
    var validVeg = +this.veg_in;
    this.addExchange(this.vegetable_rates, validVeg);
    //fruit calc
    var validFruit = +this.fruit_in;
    this.addExchange(this.fruit_rates, validFruit);
    //milk calc
    var validMilk = +this.milk_in;
    this.addExchange(this.milk_rates, validMilk);
    //meat calc
    var validMeat = +this.meat_in;
    this.addExchange(this.meat_rates, validMeat);
    //fat calc
    var validFat = +this.fat_in;
    this.addExchange(this.fat_rates, validFat);

    this.total_calories = Math.round(this.carbs_exch.calories) + Math.round(this.proteins_exch.calories) + Math.round(this.fats_exch.calories);

    this.carbs_exch.percent = this.total_calories == 0 ? 0 : 100 * (this.carbs_exch.calories / this.total_calories);
    this.proteins_exch.percent = this.total_calories == 0 ? 0 : 100 * (this.proteins_exch.calories / this.total_calories);
    this.fats_exch.percent = this.total_calories == 0 ? 0 : 100 * (this.fats_exch.calories / this.total_calories);

    this.resultTable.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  resetExcanges() {
    this.carbs_exch.grams = 0;
    this.carbs_exch.calories = 0;
    this.proteins_exch.grams = 0;
    this.proteins_exch.calories = 0;
    this.fats_exch.grams = 0;
    this.fats_exch.calories = 0;
  }

  addExchange(exch: exch_rates, valid_in: number) {
    this.carbs_exch.grams += (valid_in * exch.carbs_grams);
    this.carbs_exch.calories += (valid_in * (exch.calories * (exch.carbs_grams / exch.total_grams)));
    this.proteins_exch.grams += (valid_in * exch.proteins_grams);
    this.proteins_exch.calories += (valid_in * (exch.calories * (exch.proteins_grams / exch.total_grams)));
    this.fats_exch.grams += (valid_in * exch.fats_grams);
    this.fats_exch.calories += (valid_in * (exch.calories * (exch.fats_grams / exch.total_grams)));
  }
}

interface exchanges {
  label: string;
  grams: number;
  calories: number;
  percent: number;
}

interface exch_rates {
  carbs_grams: number;
  proteins_grams: number;
  fats_grams: number;
  total_grams: number;
  calories: number;
}