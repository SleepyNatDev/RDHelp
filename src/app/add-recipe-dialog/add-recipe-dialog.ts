import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddRecipeDialogData } from '../add-recipe-dialog-data';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  selector: 'app-add-recipe-dialog',
  styleUrl: './add-recipe-dialog.scss',
  templateUrl: './add-recipe-dialog.html',
})
export class AddRecipeDialog {
  readonly dialogRef = inject(MatDialogRef<AddRecipeDialog>);
  readonly data = inject<AddRecipeDialogData>(MAT_DIALOG_DATA);
  readonly recipe = model(this.data.recipe);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
