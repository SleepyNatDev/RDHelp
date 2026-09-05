import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExchangesCalc } from './exchanges-calc';

describe('ExchangesCalc', () => {
  let component: ExchangesCalc;
  let fixture: ComponentFixture<ExchangesCalc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangesCalc],
    }).compileComponents();

    fixture = TestBed.createComponent(ExchangesCalc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
