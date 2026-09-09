import { Component, ElementRef, inject, model, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddRecipeDialogData } from '../add-recipe-dialog-data';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipGrid, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatChipsModule,
    MatChipGrid,
    MatIconModule,
  ],
  selector: 'app-add-recipe-dialog',
  styleUrl: './add-recipe-dialog.scss',
  templateUrl: './add-recipe-dialog.html',
})
export class AddRecipeDialog {
  @ViewChild('tagInput') tagInput!: ElementRef;
  readonly dialogRef = inject(MatDialogRef<AddRecipeDialog>);
  readonly data = inject<AddRecipeDialogData>(MAT_DIALOG_DATA);
  readonly recipe = model(this.data.recipe);
  separatorKeys = [188, 13, 3]; // Comma and Windows + Mac Enter keys

  fileName: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.recipe());
  }

  addTag(tagName: string): void {
    if (tagName && tagName.trim() !== '') {
      const newTag = { name: tagName.trim() };
      this.recipe().tags.push(newTag);
      this.tagInput.nativeElement.value = '';
    }
  }

  removeTag(tagToRemove: { name: string }): void {
    this.recipe().tags = this.recipe().tags.filter(tag => tag.name !== tagToRemove.name);
  }
}
