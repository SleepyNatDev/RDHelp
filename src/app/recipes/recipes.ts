import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Recipe } from '../recipe';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeDialog } from '../add-recipe-dialog/add-recipe-dialog';
import { RecipeService } from '../recipe-service';
import { AuthenticationService } from '../authentication-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatChipsModule, CommonModule],
  selector: 'app-recipes',
  styleUrl: './recipes.scss',
  templateUrl: './recipes.html',
})
export class Recipes {
  readonly dialog = inject(MatDialog);
  readonly cdRef = inject(ChangeDetectorRef);
  loggedIn: Observable<boolean>;

  recipes_available: Recipe[] = [];

  recipes_shown = signal(this.recipes_available);

  constructor(private recipeService: RecipeService, private authService: AuthenticationService) {
    this.recipeService.getRecipes().subscribe(recipes => {
      if (recipes) {
        this.recipes_available = recipes;
        this.recipes_shown.set(this.recipes_available);
      }
    });

    this.loggedIn = this.authService.isLoggedIn;
  }

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
        // send recipe object to backend, wait for ok
        this.recipeService.addRecipe(result).subscribe((updatedList) => {
          this.recipes_available = updatedList as Recipe[];
          this.recipes_shown.set(this.recipes_available);
          this.cdRef.detectChanges();
        });
      }
    });
  }
}
