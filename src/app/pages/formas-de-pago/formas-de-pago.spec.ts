import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormasDePago } from './formas-de-pago';

describe('FormasDePago', () => {
  let component: FormasDePago;
  let fixture: ComponentFixture<FormasDePago>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormasDePago]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormasDePago);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
