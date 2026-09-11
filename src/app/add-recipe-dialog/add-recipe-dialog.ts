import { Component, ElementRef, inject, model, signal, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddRecipeDialogData } from '../add-recipe-dialog-data';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipGrid, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RecipeService } from '../recipe-service';
import { ImageService } from '../image-service';

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
  @ViewChild('fileUpload') fileUpload!: ElementRef;
  readonly dialogRef = inject(MatDialogRef<AddRecipeDialog>);
  readonly data = inject<AddRecipeDialogData>(MAT_DIALOG_DATA);
  readonly recipe = model(this.data.recipe);
  separatorKeys = [188, 13, 3]; // Comma and Windows + Mac Enter keys

  fileName: string = '';
  fileUploaded = signal(false);

  constructor(private recipeService: RecipeService, private imageService: ImageService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // send image to backend, wait for clean path
      const formData: FormData = new FormData();
      
      // Append file
      if (file) {
        formData.append('image', file, file.name);
        this.imageService.addImage(formData).subscribe((result) => {
          if (result) {
            this.recipe().image = result.toString();
            this.fileName = file.name;
            this.fileUploaded.set(true);
          }
        });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      // Handle the dropped files here
      console.log('Dropped files:', files);
    }
  }

  submit(): void {
    this.dialogRef.close(this.recipe());
  }

  addTag(tagName: string): void {
    if (tagName && tagName.trim() !== '') {
      const newTag = { id: 0, name: tagName.trim() };
      this.recipe().tags.push(newTag);
      this.tagInput.nativeElement.value = '';
    }
  }

  removeTag(tagToRemove: { name: string }): void {
    this.recipe().tags = this.recipe().tags.filter(tag => tag.name !== tagToRemove.name);
  }

  handleFileUpload(): void {
    if (!this.fileUploaded()) {
      this.fileUpload.nativeElement.click();
    }
  }

  removeFile(): void {
    this.fileName = '';
    // reset file input using timeout to avoid handleFileUpload being called immediately after file removal
    setTimeout(() => {
      this.fileUploaded.set(false);
    });
  }
}
