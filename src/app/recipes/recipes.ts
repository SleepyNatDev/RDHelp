import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Recipe } from '../recipe';
import { Tag } from '../tag';

@Component({
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatChipsModule],
  selector: 'app-recipes',
  styleUrl: './recipes.scss',
  templateUrl: './recipes.html',
})
export class Recipes {
  test_tag1: Tag = {
    name: 'heart healthy'
  }
  test_tag2: Tag = {
    name: 'diabetic diet'
  }
  test_tag3: Tag = {
    name: 'ketogenic'
  }
  test_tags: Tag[] = [
    this.test_tag1,
    this.test_tag2,
    this.test_tag3
  ];
  test_recipe: Recipe = {
    name: 'test',
    image: 'test',
    description: 'testing testing 1 2 3 testing',
    tags: this.test_tags
  }

  test_recipe2: Recipe = {
    name: 'test',
    image: 'test',
    description: 'testing testing 1 2 3 testing testing',
    tags: this.test_tags
  }

  recipes_shown: Recipe[] = [
    this.test_recipe,
    this.test_recipe2
  ];
}
