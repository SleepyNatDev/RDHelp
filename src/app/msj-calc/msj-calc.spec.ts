import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MsjCalc } from './msj-calc';

describe('MsjCalc', () => {
  let component: MsjCalc;
  let fixture: ComponentFixture<MsjCalc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsjCalc],
    }).compileComponents();

    fixture = TestBed.createComponent(MsjCalc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
