import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Recipe } from '../recipe';
import { Tag } from '../tag';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeDialog } from '../add-recipe-dialog/add-recipe-dialog';

@Component({
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatChipsModule],
  selector: 'app-recipes',
  styleUrl: './recipes.scss',
  templateUrl: './recipes.html',
})
export class Recipes {
  readonly dialog = inject(MatDialog);
  readonly cdRef = inject(ChangeDetectorRef);

  test_tag1: Tag = {
    name: 'heart healthy'
  };
  test_tag2: Tag = {
    name: 'diabetic diet'
  };
  test_tag3: Tag = {
    name: 'ketogenic'
  };
  test_tags: Tag[] = [
    this.test_tag1,
    this.test_tag2,
    this.test_tag3
  ];

  test_recipe: Recipe = {
    id: 0,
    name: 'test',
    image: 'test',
    description: 'testing testing 1 2 3 testing',
    tags: this.test_tags
  };
  test_recipe2: Recipe = {
    id: 1,
    name: 'test',
    image: 'test',
    description: 'testing testing 1 2 3 testing testing',
    tags: this.test_tags
  };

  recipes_available: Recipe[] = [
    this.test_recipe,
    this.test_recipe2
  ];

  recipes_shown = signal(this.recipes_available);

  openAddRecipeDialog() {
    var recipe_add = {
      name: '',
      image: '',
      description: '',
      tags: []
    }
    const dialogRef = this.dialog.open(AddRecipeDialog, {
      data: {recipe: recipe_add},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        result.id = this.recipes_available.length;
        this.recipes_available.push(result);
        this.recipes_shown.set(this.recipes_available);
        this.cdRef.detectChanges();
      }
    });
  }
}
