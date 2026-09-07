import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatChipsModule],
  selector: 'app-recipes',
  styleUrl: './recipes.scss',
  templateUrl: './recipes.html',
})
export class Recipes {
  test_recipe: recipe = {
    name: 'test',
    description: 'testing testing 1 2 3 testing'
  }

  test_recipe2: recipe = {
    name: 'test',
    description: 'testing testing 1 2 3 testing testing'
  }

  recipes_shown: recipe[] = [
    this.test_recipe,
    this.test_recipe2
  ];
}

interface recipe {
  name: string;
  description: string;
}
