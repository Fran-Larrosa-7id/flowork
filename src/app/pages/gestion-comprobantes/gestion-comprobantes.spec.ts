import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionComprobantes } from './gestion-comprobantes';

describe('GestionComprobantes', () => {
  let component: GestionComprobantes;
  let fixture: ComponentFixture<GestionComprobantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionComprobantes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionComprobantes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
