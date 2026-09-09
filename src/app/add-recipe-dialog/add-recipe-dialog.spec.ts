import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddRecipeDialog } from './add-recipe-dialog';

describe('AddRecipeDialog', () => {
  let component: AddRecipeDialog;
  let fixture: ComponentFixture<AddRecipeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecipeDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRecipeDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
